from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import func, text
from sqlalchemy.orm import Session, selectinload

from app.ai import generate_reply
from app.analytics import factual_analytics
from app.database import Base, engine, get_db
from app.dependencies import current_student, current_teacher
from app.models import ClassRoom, Conversation, Message, Student, Teacher
from app.schemas import AuthResponse, ChatRequest, ChatResponse, ConversationResponse, ConversationSummary, MessageResponse, StudentAuthRequest, TeacherAuthRequest
from app.security import create_access_token, verify_secret


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(engine)
    yield


app = FastAPI(title="LearnLens API", version="0.1.0", lifespan=lifespan)


def _message(message: Message) -> MessageResponse:
    return MessageResponse(id=message.id, role=message.role, content=message.content, topic=message.topic, created_at=message.created_at)


def _conversation(conversation: Conversation) -> ConversationResponse:
    return ConversationResponse(id=conversation.id, created_at=conversation.created_at, updated_at=conversation.updated_at, messages=[_message(message) for message in conversation.messages])


@app.get("/api/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok"}


@app.post("/api/auth/student", response_model=AuthResponse)
def authenticate_student(payload: StudentAuthRequest, db: Session = Depends(get_db)):
    classroom = db.query(ClassRoom).filter(func.lower(ClassRoom.code) == payload.class_code.strip().lower()).first()
    if classroom is None or not verify_secret(payload.access_code, classroom.access_code_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid class credentials")
    import secrets
    while True:
        anonymous_id = f"STU-{secrets.token_hex(4).upper()}"
        if db.query(Student).filter_by(anonymous_id=anonymous_id).first() is None:
            break
    student = Student(anonymous_id=anonymous_id, class_id=classroom.id)
    db.add(student)
    db.commit()
    db.refresh(student)
    return AuthResponse(access_token=create_access_token(str(student.id), "student"), anonymous_student_id=student.anonymous_id)


@app.post("/api/auth/teacher", response_model=AuthResponse)
def authenticate_teacher(payload: TeacherAuthRequest, db: Session = Depends(get_db)):
    classroom = db.query(ClassRoom).filter(func.lower(ClassRoom.code) == payload.class_code.strip().lower()).first()
    teacher = None if classroom is None else db.query(Teacher).filter_by(class_id=classroom.id, email=payload.teacher_email.strip().lower()).first()
    if classroom is None or teacher is None or not verify_secret(payload.access_code, classroom.access_code_hash) or not verify_secret(payload.teacher_password, teacher.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid teacher credentials")
    return AuthResponse(access_token=create_access_token(str(teacher.id), "teacher"))


@app.get("/api/student/history", response_model=list[ConversationSummary])
def student_history(student: Student = Depends(current_student), db: Session = Depends(get_db)):
    conversations = db.query(Conversation).filter_by(student_id=student.id).order_by(Conversation.updated_at.desc()).all()
    return [ConversationSummary(id=item.id, created_at=item.created_at, updated_at=item.updated_at, message_count=len(item.messages)) for item in conversations]


@app.get("/api/student/chat/{conversation_id}", response_model=ConversationResponse)
def get_student_chat(conversation_id: int, student: Student = Depends(current_student), db: Session = Depends(get_db)):
    conversation = db.query(Conversation).options(selectinload(Conversation.messages)).filter_by(id=conversation_id, student_id=student.id).first()
    if conversation is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return _conversation(conversation)


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, student: Student = Depends(current_student), db: Session = Depends(get_db)):
    conversation = None
    if payload.conversation_id:
        conversation = db.query(Conversation).options(selectinload(Conversation.messages)).filter_by(id=payload.conversation_id, student_id=student.id).first()
        if conversation is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    else:
        conversation = Conversation(student_id=student.id)
        db.add(conversation)
        db.flush()
    user_message = Message(conversation_id=conversation.id, role="user", content=payload.content.strip())
    db.add(user_message)
    db.flush()
    history = [(message.role, message.content) for message in conversation.messages] + [("user", user_message.content)]
    assistant_message = Message(conversation_id=conversation.id, role="assistant", content=generate_reply(history))
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)
    return ChatResponse(conversation_id=conversation.id, assistant_message=_message(assistant_message))


@app.get("/api/teacher/dashboard")
def teacher_dashboard(teacher: Teacher = Depends(current_teacher), db: Session = Depends(get_db)):
    return factual_analytics(db, teacher.class_id)


@app.get("/api/teacher/analytics")
def teacher_analytics(teacher: Teacher = Depends(current_teacher), db: Session = Depends(get_db)):
    return {"factual_statistics": factual_analytics(db, teacher.class_id), "ai_interpretation": None, "note": "AI interpretation has not been generated."}


@app.post("/api/teacher/report")
def teacher_report(teacher: Teacher = Depends(current_teacher), db: Session = Depends(get_db)):
    return {"report_format": "json", "factual_statistics": factual_analytics(db, teacher.class_id), "ai_interpretation": None}

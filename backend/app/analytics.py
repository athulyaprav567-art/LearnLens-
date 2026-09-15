from datetime import datetime, time, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Conversation, Message, Student


def factual_analytics(db: Session, class_id: int) -> dict:
    """Return aggregate facts only; never include anonymous IDs or message text."""
    today = datetime.combine(datetime.now(timezone.utc).date(), time.min, tzinfo=timezone.utc)
    accessed_today = db.query(func.count(Student.id)).filter(Student.class_id == class_id, Student.created_at >= today).scalar() or 0
    question_filter = (Message.role == "user", Message.created_at >= today)
    questions_today = (
        db.query(func.count(Message.id)).join(Conversation).join(Student)
        .filter(Student.class_id == class_id, *question_filter).scalar() or 0
    )
    students_with_questions = (
        db.query(func.count(func.distinct(Conversation.student_id))).join(Message).join(Student)
        .filter(Student.class_id == class_id, *question_filter).scalar() or 0
    )
    topic_rows = (
        db.query(Message.topic, func.count(Message.id)).join(Conversation).join(Student)
        .filter(Student.class_id == class_id, Message.role == "user", Message.topic.is_not(None))
        .group_by(Message.topic).order_by(func.count(Message.id).desc()).all()
    )
    return {
        "students_accessed_today": accessed_today,
        "students_asked_doubts_today": students_with_questions,
        "questions_today": questions_today,
        "topic_distribution": [{"topic": topic, "question_count": count} for topic, count in topic_rows],
    }

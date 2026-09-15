from datetime import datetime

from pydantic import BaseModel, Field


class StudentAuthRequest(BaseModel):
    class_code: str = Field(min_length=2, max_length=64)
    access_code: str = Field(min_length=8, max_length=256)


class TeacherAuthRequest(StudentAuthRequest):
    teacher_email: str = Field(min_length=3, max_length=254)
    teacher_password: str = Field(min_length=8, max_length=256)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    anonymous_student_id: str | None = None


class ChatRequest(BaseModel):
    content: str = Field(min_length=1, max_length=12000)
    conversation_id: int | None = Field(default=None, gt=0)


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    topic: str | None
    created_at: datetime


class ConversationResponse(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime
    messages: list[MessageResponse]


class ConversationSummary(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime
    message_count: int


class ChatResponse(BaseModel):
    conversation_id: int
    assistant_message: MessageResponse

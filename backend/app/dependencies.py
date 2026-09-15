from typing import Literal

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Student, Teacher
from app.security import decode_access_token

bearer = HTTPBearer(auto_error=False)


def _claims(credentials: HTTPAuthorizationCredentials | None) -> dict:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return decode_access_token(credentials.credentials)


def _principal(role: Literal["student", "teacher"], db: Session, credentials: HTTPAuthorizationCredentials | None):
    claims = _claims(credentials)
    if claims.get("role") != role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    model = Student if role == "student" else Teacher
    principal = db.get(model, int(claims.get("sub", 0)))
    if principal is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session no longer exists")
    return principal


def current_student(db: Session = Depends(get_db), credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> Student:
    return _principal("student", db, credentials)


def current_teacher(db: Session = Depends(get_db), credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> Teacher:
    return _principal("teacher", db, credentials)

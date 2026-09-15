"""One-time credential provisioning from a local environment variable."""
import json

from pydantic import BaseModel, Field, ValidationError

from app.config import get_settings
from app.database import SessionLocal, engine
from app.models import Base, ClassRoom, Teacher
from app.security import hash_secret


class BootstrapRecord(BaseModel):
    class_code: str = Field(min_length=2, max_length=64)
    access_code: str = Field(min_length=8, max_length=256)
    teacher_email: str = Field(min_length=3, max_length=254)
    subject: str = Field(min_length=2, max_length=160)
    teacher_password: str = Field(min_length=8, max_length=256)


def main() -> None:
    raw = get_settings().learnlens_bootstrap_json
    if not raw:
        raise SystemExit("LEARNLENS_BOOTSTRAP_JSON is required; see README.md.")
    try:
        records = [BootstrapRecord.model_validate(item) for item in json.loads(raw)]
    except (json.JSONDecodeError, ValidationError, TypeError) as exc:
        raise SystemExit("LEARNLENS_BOOTSTRAP_JSON must be a valid JSON array of credential records.") from exc
    if not records:
        raise SystemExit("At least one credential record is required.")
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        for record in records:
            code = record.class_code.strip().upper()
            email = record.teacher_email.strip().lower()
            if db.query(ClassRoom).filter_by(code=code).first():
                raise SystemExit(f"Class {code} already exists; refusing to overwrite it.")
            classroom = ClassRoom(code=code, access_code_hash=hash_secret(record.access_code))
            db.add(classroom)
            db.flush()
            db.add(Teacher(class_id=classroom.id, email=email, subject=record.subject.strip(), password_hash=hash_secret(record.teacher_password)))
        db.commit()
    print(f"Provisioned {len(records)} class and teacher record(s).")


if __name__ == "__main__":
    main()

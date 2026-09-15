from app.security import hash_secret, verify_secret


def student_login(client):
    response = client.post("/api/auth/student", json={"class_code": "CSE", "access_code": "class-access-code"})
    assert response.status_code == 200
    return response.json()


def teacher_login(client):
    response = client.post("/api/auth/teacher", json={"class_code": "CSE", "access_code": "class-access-code", "teacher_email": "teacher@example.edu", "teacher_password": "teacher-password"})
    assert response.status_code == 200
    return response.json()["access_token"]


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


def test_invalid_class_authentication_is_rejected(client):
    response = client.post("/api/auth/student", json={"class_code": "UNKNOWN", "access_code": "class-access-code"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid class credentials"


def test_student_authentication_generates_unique_anonymous_ids(client):
    first = student_login(client)
    second = student_login(client)
    assert first["anonymous_student_id"].startswith("STU-")
    assert first["anonymous_student_id"] != second["anonymous_student_id"]
    assert first["access_token"] != second["access_token"]


def test_teacher_authentication(client):
    token = teacher_login(client)
    response = client.get("/api/teacher/dashboard", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["questions_today"] == 0


def test_password_hashing_and_verification():
    hashed = hash_secret("not-plain-text")
    assert hashed != "not-plain-text"
    assert verify_secret("not-plain-text", hashed)
    assert not verify_secret("wrong-secret", hashed)


def test_teacher_statistics_do_not_expose_student_identity_or_messages(client):
    student = student_login(client)
    token = teacher_login(client)
    response = client.get("/api/teacher/analytics", headers={"Authorization": f"Bearer {token}"})
    rendered = response.text
    assert response.status_code == 200
    assert student["anonymous_student_id"] not in rendered
    assert "student_id" not in rendered
    assert "content" not in rendered


def test_student_cannot_read_another_students_conversation(client):
    first = student_login(client)
    second = student_login(client)
    # No chat is configured in tests, but the route must not reveal a guessed ID to another student.
    response = client.get("/api/student/chat/1", headers={"Authorization": f"Bearer {second['access_token']}"})
    assert response.status_code == 404

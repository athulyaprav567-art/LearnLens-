# LearnLens backend

FastAPI foundation for anonymous student learning chats and privacy-preserving teacher analytics.

## Architecture

- FastAPI routes validate requests and return safe HTTP errors.
- SQLAlchemy provides a replaceable relational data layer. SQLite is the local default; set `DATABASE_URL` to a production database URL (such as PostgreSQL) when deploying.
- Passwords and class access codes are stored only as Argon2 hashes. JWTs identify anonymous student or teacher sessions.
- Conversation content belongs to the anonymous student session. Teacher endpoints expose only aggregate statistics, never student IDs or messages.
- The chat adapter uses OpenAI's Responses API only when `OPENAI_API_KEY` and `AI_MODEL` are configured. Otherwise it returns a configuration error and stores no fabricated response.

## Setup

From this directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

The API is served at `http://127.0.0.1:8000`; interactive documentation is at `/docs`.

Create actual class and teacher credentials before authenticating users. Set `LEARNLENS_BOOTSTRAP_JSON` in your local `.env` (never commit it), then run:

```powershell
python -m app.bootstrap
```

Its value is a JSON array such as:

```json
[{"class_code":"CSE","access_code":"replace-this-secret","teacher_email":"teacher@example.edu","subject":"Data Structures","teacher_password":"replace-this-secret"}]
```

The command hashes those values before writing them and refuses to replace existing records.

## Environment variables

See `.env.example`. Required in every environment: `DATABASE_URL` and a long random `JWT_SECRET_KEY`. Chat also requires `OPENAI_API_KEY` and `AI_MODEL`. `LEARNLENS_BOOTSTRAP_JSON` is only for initial local/admin provisioning and should be removed after use.

## Implemented endpoints

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | Service and database health check |
| `POST /api/auth/student` | Validates class access and creates an anonymous ID/session |
| `POST /api/auth/teacher` | Validates class access and teacher password/session |
| `GET /api/student/history` | Authenticated student's real conversation summaries |
| `GET /api/student/chat/{conversation_id}` | Authenticated student's own conversation only |
| `POST /api/chat` | Stores a real student question and configured AI response |
| `GET /api/teacher/dashboard` | Real aggregate activity for the teacher's class |
| `GET /api/teacher/analytics` | Factual stored topic counts; no AI interpretation is invented |
| `POST /api/teacher/report` | Returns a report-ready factual snapshot (download export is planned) |

## Planned

- Admin credential/class management with audited access controls
- Topic classification with an explicit confidence/unknown state
- AI-generated teaching recommendations clearly separated from factual counts
- Downloadable report formats and background report jobs
- Database migrations and production PostgreSQL deployment configuration

## Tests

```powershell
pytest
```

Tests use an isolated temporary SQLite database and contain no fixture activity data beyond the minimum credentials/messages needed to exercise each behavior.

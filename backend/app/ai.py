from fastapi import HTTPException, status

from app.config import get_settings

SYSTEM_PROMPT = """You are LearnLens, an encouraging learning assistant. Explain concepts clearly,
support the student's reasoning, and be honest when uncertain. Do not claim certainty you do not have."""


def generate_reply(context: list[tuple[str, str]]) -> str:
    """Call the configured provider without logging private conversation content."""
    settings = get_settings()
    if not settings.openai_api_key or not settings.ai_model:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Chat is not configured yet")
    try:
        from openai import OpenAI

        client = OpenAI(api_key=settings.openai_api_key)
        response = client.responses.create(
            model=settings.ai_model,
            instructions=SYSTEM_PROMPT,
            input=[{"role": role, "content": content} for role, content in context],
        )
        if not response.output_text:
            raise ValueError("Provider returned no text")
        return response.output_text
    except HTTPException:
        raise
    except Exception as exc:
        # Provider details may expose account or request information; keep them server-side only.
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="The learning assistant is temporarily unavailable") from exc

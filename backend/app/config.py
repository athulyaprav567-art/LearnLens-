from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./learnlens.db"
    jwt_secret_key: str = "development-only-change-me-before-deploying-32-bytes"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    openai_api_key: str | None = None
    ai_model: str | None = None
    learnlens_bootstrap_json: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()

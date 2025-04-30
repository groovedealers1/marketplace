from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: str
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    COOKIE_SECRET: str
    MANAGER_SECRET: str

    BOT_TOKEN: str
    CHANNEL_ID: int

    @property
    def DATABASE_URL_asyncpg(self):
        return f'postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'


    @property
    def COOKIE_SECRET(self):
        return f'{self.COOKIE_SECRET}'


    @property
    def MANAGER_SECRET(self):
        return f'{self.MANAGER_SECRET}'


    @property
    def BOT_TOKEN(self):
        return f'{self.BOT_TOKEN}'


    @property
    def CHANNEL_ID(self):
        return f'{self.CHANNEL_ID}'

    model_config = SettingsConfigDict(env_file=f'{BASE_DIR}/.env')


settings = Settings()

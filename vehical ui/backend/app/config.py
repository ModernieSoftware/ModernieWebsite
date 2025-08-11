#this file load the environment varible

from pydantic_settings import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    #database connecting string
    DATABASE_URL:str
    model_config=SettingsConfigDict(env_file=".env",extra="ignore")

settings=Settings()
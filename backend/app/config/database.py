from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

if settings.USE_SQLITE_DB == "True":
    SQLALCHAMY_DATABASE_URL = 'sqlite:///./ecomfastapi.db'
    engine = create_engine(SQLALCHAMY_DATABASE_URL,connect_args={"check_same_thread": False})
else:
    SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL
    engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
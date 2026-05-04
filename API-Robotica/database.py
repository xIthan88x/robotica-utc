from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Usa SQLite por ahora (fácil y sin servidor)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./inscripciones.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Necesario para SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Función para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
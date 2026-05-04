from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Inscripcion(Base):
    __tablename__ = "inscripciones"

    id = Column(Integer, primary_key=True, index=True)
    nombre_equipo = Column(String, index=True, nullable=False)
    categoria = Column(String, index=True, nullable=False)
    miembros = Column(String, nullable=False)           # Nombres separados por coma
    plantel = Column(String, nullable=False)
    email_contacto = Column(String, nullable=False)
    fecha_inscripcion = Column(DateTime(timezone=True), server_default=func.now())
from pydantic import BaseModel
from datetime import datetime

class InscripcionBase(BaseModel):
    nombre_equipo: str
    categoria: str
    miembros: str
    plantel: str
    email_contacto: str

class InscripcionCreate(InscripcionBase):
    pass

class InscripcionResponse(InscripcionBase):
    id: int
    fecha_inscripcion: datetime

    class Config:
        from_attributes = True
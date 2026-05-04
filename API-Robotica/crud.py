from sqlalchemy.orm import Session
import models
import schemas

def crear_inscripcion(db: Session, inscripcion: schemas.InscripcionCreate):
    db_inscripcion = models.Inscripcion(
        nombre_equipo=inscripcion.nombre_equipo,
        categoria=inscripcion.categoria,
        miembros=inscripcion.miembros,
        plantel=inscripcion.plantel,
        email_contacto=inscripcion.email_contacto
    )
    db.add(db_inscripcion)
    db.commit()
    db.refresh(db_inscripcion)
    return db_inscripcion

def get_inscripciones(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Inscripcion)\
             .order_by(models.Inscripcion.fecha_inscripcion.desc())\
             .offset(skip).limit(limit).all()
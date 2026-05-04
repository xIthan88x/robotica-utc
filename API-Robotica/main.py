from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
import crud
from database import engine, get_db

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Inscripciones - Club de Robótica UTC")

# Configuración CORS (permite que tu sitio web envíe datos a la API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Cambia esto después por tu dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta de bienvenida
@app.get("/")
def root():
    return {"message": "API de Inscripciones del Club de Robótica UTC - Funcionando correctamente"}

# Crear una nueva inscripción
@app.post("/inscripciones/", response_model=schemas.InscripcionResponse)
def crear_inscripcion(inscripcion: schemas.InscripcionCreate, db: Session = Depends(get_db)):
    return crud.crear_inscripcion(db=db, inscripcion=inscripcion)

# Listar todas las inscripciones
@app.get("/inscripciones/")
def listar_inscripciones(db: Session = Depends(get_db)):
    return crud.get_inscripciones(db=db)

# ====================== PANEL DE ADMINISTRACIÓN ======================
from admin import router as admin_router
app.include_router(admin_router, prefix="/api")

# Para ejecutar con: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
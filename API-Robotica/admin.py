from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
import models
from database import get_db
import secrets
from datetime import datetime

router = APIRouter()
security = HTTPBasic()

# Credenciales de administrador (cámbialas antes de desplegar)
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "robotica2025"   # ¡Cambia esto por una contraseña segura!

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@router.get("/admin", response_class=HTMLResponse)
def admin_panel(db: Session = Depends(get_db), username: str = Depends(verify_admin)):
    inscripciones = db.query(models.Inscripcion)\
                      .order_by(models.Inscripcion.fecha_inscripcion.desc())\
                      .all()

    html = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Panel Admin - Club de Robótica UTC</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                background: #0f172a; 
                color: #e2e8f0; 
                margin: 0; 
                padding: 20px; 
            }}
            .container {{ max-width: 1300px; margin: 0 auto; }}
            h1 {{ color: #00D4FF; text-align: center; }}
            .subtitle {{ text-align: center; color: #94a3b8; margin-bottom: 30px; }}
            table {{ 
                width: 100%; 
                border-collapse: collapse; 
                background: #1e2937; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 0 30px rgba(0, 212, 255, 0.25);
            }}
            th, td {{ 
                padding: 14px 18px; 
                text-align: left; 
                border-bottom: 1px solid #334155; 
            }}
            th {{ 
                background: #1e40af; 
                color: white; 
                position: sticky; 
                top: 0; 
            }}
            tr:hover {{ background: #334155; }}
            .header {{ 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                margin-bottom: 25px; 
            }}
            .count {{ 
                background: #00D4FF; 
                color: #0f172a; 
                padding: 8px 18px; 
                border-radius: 30px; 
                font-weight: bold; 
            }}
            .fecha {{ color: #94a3b8; font-size: 0.95rem; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div>
                    <h1>Panel de Administración</h1>
                    <p class="subtitle">Inscripciones al Torneo ELITE ROBOTS 2025</p>
                </div>
                <div>
                    <span class="count">{len(inscripciones)} inscripciones registradas</span>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipo</th>
                        <th>Categoría</th>
                        <th>Miembros</th>
                        <th>Plantel</th>
                        <th>Email Contacto</th>
                        <th>Fecha de Inscripción</th>
                    </tr>
                </thead>
                <tbody>
    """

    for ins in inscripciones:
        fecha = ins.fecha_inscripcion.strftime("%d/%m/%Y %H:%M")
        html += f"""
                    <tr>
                        <td><strong>{ins.id}</strong></td>
                        <td>{ins.nombre_equipo}</td>
                        <td><strong>{ins.categoria}</strong></td>
                        <td>{ins.miembros}</td>
                        <td>{ins.plantel}</td>
                        <td>{ins.email_contacto}</td>
                        <td class="fecha">{fecha}</td>
                    </tr>
        """

    html += """
                </tbody>
            </table>
        </div>
    </body>
    </html>
    """
    return html
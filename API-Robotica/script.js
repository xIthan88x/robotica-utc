// ====================== CONFIGURACIÓN GENERAL ======================

// URL de la API en producción (Render.com)
const API_URL = "https://api-robotica-utc.onrender.com";

// ====================== FORMULARIO DE INSCRIPCIÓN ======================
const inscripcionForm = document.getElementById('inscripcion-form');

if (inscripcionForm) {
    inscripcionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nombre_equipo: document.getElementById('nombre_equipo').value.trim(),
            categoria: document.getElementById('categoria').value,
            miembros: document.getElementById('miembros').value.trim(),
            plantel: document.getElementById('plantel').value.trim(),
            email_contacto: document.getElementById('email_contacto').value.trim()
        };

        console.log("Enviando datos:", data);   // Para depuración

        try {
            const response = await fetch(`${API_URL}/inscripciones/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            console.log("Respuesta:", response.status);

            if (response.ok) {
                alert('¡Inscripción enviada exitosamente!');
                inscripcionForm.reset();
            } else {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert('Error al enviar la inscripción. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        }
    });
}

// ====================== OTRAS FUNCIONALIDADES (mantener las que ya tenías) ======================

// Menú hamburguesa
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contador (mantener tu código actual del countdown)
const countdownContainer = document.getElementById('countdown');
// ... (tu código del countdown aquí)

// Tema oscuro/claro
const themeSwitch = document.getElementById('theme-switch');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}
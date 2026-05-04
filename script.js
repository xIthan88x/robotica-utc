// ====================== CONFIGURACIÓN GENERAL ======================
const API_URL = "https://api-robotica-utc.onrender.com";

// ====================== MENÚ HAMBURGUESA ======================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// ====================== SCROLL SUAVE ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====================== CONTADOR REGRESIVO ======================
const countdownContainer = document.getElementById('countdown');

if (countdownContainer) {
    const targetDate = new Date('2026-12-15T09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownContainer.innerHTML = `<div style="color:#ff00cc; font-size:1.8rem; text-align:center;">¡El torneo ya comenzó!</div>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

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

        console.log("Enviando inscripción:", data);

        try {
            const response = await fetch(`${API_URL}/inscripciones/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('¡Inscripción enviada exitosamente!');
                inscripcionForm.reset();
            } else {
                alert('Error al enviar la inscripción. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('No se pudo conectar con el servidor. Verifica tu conexión.');
        }
    });
}

// ====================== CAMBIO DE TEMA ======================
const themeSwitch = document.getElementById('theme-switch');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', current);
        localStorage.setItem('theme', current);
    });
}

// ====================== CARRUSEL DE GALERÍA ======================
const track = document.getElementById('carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    let currentIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateDots() {
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    });

    // Auto-slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }, 4000);

    updateDots();
}

// ====================== CARRUSEL DE VIDEOS ======================
const videoTrack = document.getElementById('video-carousel-track');
if (videoTrack) {
    const videoSlides = Array.from(videoTrack.children);
    const videoPrev = document.getElementById('video-prev');
    const videoNext = document.getElementById('video-next');
    const videoDotsContainer = document.getElementById('video-dots');

    let videoIndex = 0;

    videoSlides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            videoIndex = i;
            updateVideoCarousel();
        });
        videoDotsContainer.appendChild(dot);
    });

    const videoDots = Array.from(videoDotsContainer.children);

    function updateVideoCarousel() {
        pauseAllVideos();
        videoTrack.style.transform = `translateX(-${videoIndex * 100}%)`;
        videoDots.forEach((dot, i) => dot.classList.toggle('active', i === videoIndex));
    }

    if (videoNext) videoNext.addEventListener('click', () => {
        videoIndex = (videoIndex + 1) % videoSlides.length;
        updateVideoCarousel();
    });

    if (videoPrev) videoPrev.addEventListener('click', () => {
        videoIndex = (videoIndex - 1 + videoSlides.length) % videoSlides.length;
        updateVideoCarousel();
    });

    setInterval(() => {
        videoIndex = (videoIndex + 1) % videoSlides.length;
        updateVideoCarousel();
    }, 5000);

    updateVideoCarousel();
}
function pauseAllVideos() {
    document.querySelectorAll('video').forEach(video => {
        video.pause();
    });

    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.src = iframe.src;
    });
}
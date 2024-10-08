let currentSlide = 0;
const items = document.querySelectorAll('.slider-item');
const container = document.querySelector('.slider-container');
const totalItems = items.length;
const slideInterval = 3000; // Tiempo en milisegundos (3 segundos)
let isMoving = false; // Variable para verificar si está en movimiento

// Función para mover al siguiente slide
function nextSlide() {
    if (!isMoving) { // Solo avanzar si no estamos en movimiento
        isMoving = true; // Marcar como en movimiento
        currentSlide = (currentSlide + 1) % totalItems;
        updateSliderPosition();
    }
}

// Función para mover al slide anterior
function prevSlide() {
    if (!isMoving) { // Solo retroceder si no estamos en movimiento
        isMoving = true; // Marcar como en movimiento
        currentSlide = (currentSlide - 1 + totalItems) % totalItems;
        updateSliderPosition();
    }
}

// Función para actualizar la posición del slider
function updateSliderPosition() {
    const width = items[0].clientWidth; // Ancho de cada item
    container.scrollTo({
        left: currentSlide * width, // Desplazarse el ancho de cada item
        behavior: 'smooth' // Desplazamiento suave
    });

    // Esperar un breve periodo para cambiar el estado de movimiento
    setTimeout(() => {
        isMoving = false; // Volver a permitir el movimiento
    }, 500); // Ajusta este tiempo según la duración de tu animación
}

// Configurar el desplazamiento automático cada X segundos
let autoSlide = setInterval(nextSlide, slideInterval);

// Eventos para los botones de navegación
document.querySelector('.custom-next').addEventListener('click', function() {
    clearInterval(autoSlide); // Detener el desplazamiento automático al hacer clic
    nextSlide();
    autoSlide = setInterval(nextSlide, slideInterval); // Reiniciar el temporizador
});

document.querySelector('.custom-prev').addEventListener('click', function() {
    clearInterval(autoSlide); // Detener el desplazamiento automático al hacer clic
    prevSlide();
    autoSlide = setInterval(nextSlide, slideInterval); // Reiniciar el temporizador
});

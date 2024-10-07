let currentSlide = 0;
const items = document.querySelectorAll('.slider-item');
const container = document.querySelector('.slider-container');
const totalItems = items.length;

// Función para mover al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalItems;
    updateSliderPosition();
}

// Función para mover al slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalItems) % totalItems;
    updateSliderPosition();
}

// Función para actualizar la posición del slider
function updateSliderPosition() {
    const width = items[0].clientWidth; // Ancho de cada item
    container.scrollTo({
        left: currentSlide * width, // Desplazarse el ancho de cada item
        behavior: 'smooth' // Desplazamiento suave
    });
}

// Eventos para los botones de navegación
document.querySelector('.custom-next').addEventListener('click', nextSlide);
document.querySelector('.custom-prev').addEventListener('click', prevSlide);

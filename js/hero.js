document.addEventListener('DOMContentLoaded', function () {
    // Agregar la clase "active" cuando el slide cambia
    var carousel = document.querySelector('#novedadesCarousel');
    carousel.addEventListener('slide.bs.carousel', function (e) {
        // Eliminar la animación en todos los items
        var items = document.querySelectorAll('.carousel-item');
        items.forEach(function (item) {
            item.querySelector('.moto-img').classList.remove('active');
            item.querySelectorAll('.animated-text').forEach(function (text) {
                text.classList.remove('active');
            });
        });

        // Añadir la animación al nuevo item activo
        var nextItem = e.relatedTarget;
        nextItem.querySelector('.moto-img').classList.add('active');
        nextItem.querySelectorAll('.animated-text').forEach(function (text) {
            text.classList.add('active');
        });
    });
});

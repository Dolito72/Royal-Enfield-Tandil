document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el carrusel por ID
    var carousel = document.querySelector('#novedadesCarousel');

    // Detecta el cambio de slide en el evento 'slide.bs.carousel'
    carousel.addEventListener('slide.bs.carousel', function (e) {
        // Elimina la animación de los elementos activos previos
        var items = document.querySelectorAll('.carousel-hero');
        items.forEach(function (item) {
            item.querySelector('.moto-hero').classList.remove('active');
            item.querySelectorAll('.animated-text').forEach(function (text) {
                text.classList.remove('active');
            });
        });

        // Activa la animación para el nuevo slide
        var nextItem = e.relatedTarget;
        nextItem.querySelector('.moto-hero').classList.add('active');
        nextItem.querySelectorAll('.animated-text').forEach(function (text) {
            text.classList.add('active');
        });

       
    });
});

// Seleccionamos la imagen del header y el logo
const headerImg = document.querySelector('.imagen-header'); // Cambia '.header-img' por la clase de tu imagen
const logoImg = document.querySelector('.logo-header'); // Cambia '.logo-img' por la clase de tu logo

// Cuando la imagen del header se cargue
headerImg.onload = function() {
    headerImg.classList.add('loaded');
};

// Cuando el logo se cargue
logoImg.onload = function() {
    logoImg.classList.add('loaded');
};

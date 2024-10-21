document.querySelectorAll('.moto-link').forEach(item => { 
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir la acción predeterminada del enlace

        const motoId = this.getAttribute('data-id'); // Obtener el id de la moto
        const motoNombre = this.getAttribute('data-nombre').replace(/\s+/g, '-').toLowerCase(); // Reemplazar espacios con guiones y convertir a minúsculas

        if (motoId) {
            localStorage.setItem('motoSeleccionada', motoId); // Guardar el id en localStorage

            // Detectar si ya estamos en la carpeta "pages"
            let currentPath = window.location.pathname;

            // Si estamos en la carpeta "pages", evitar duplicarla en la URL
            let basePath = currentPath.includes('/pages/') ? './' : '/pages/';

            // Redirigir a la página de detalles con la ruta corregida
            window.location.href = `${basePath}modelos.html?name=${motoNombre}`;
        } else {
            console.error('No se encontró el id de la moto en el data-id.');
        }
    });
});

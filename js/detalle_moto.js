document.addEventListener('DOMContentLoaded', function () {
    // Obtener la moto seleccionada del localStorage o de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const motoNombre = queryParams.get('nombre'); // Obtener el nombre de la moto
    const motoSeleccionada = queryParams.get('id') || localStorage.getItem('motoSeleccionada'); // Obtener el id de la moto


    if (!motoSeleccionada) {
        console.error('No se encontró la moto seleccionada.');
        return;
    }

    fetch('../data/motos.json') // Cambiar la ruta si es necesario
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Verificar si 'motos' existe en los datos
            if (!data || !data.motos) {
                console.error('Los datos no tienen la estructura esperada.');
                return;
            }
            // Buscar la moto seleccionada
            const moto = data.motos.find(m => m.id === Number(motoSeleccionada)); // Asegúrate de comparar números
            if (moto) {
                mostrarDetallesMoto(moto);
                generarOpcionesDeColor(moto);
                
            } else {
                console.error('No se encontró la moto en los datos.');
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

function mostrarDetallesMoto(moto) {
    // Cambiar el título de la página
    document.title = `${moto.nombre} - Royal Enfield Tandil`;
    // Actualizar el logo, descripción e imagen de la moto
    document.getElementById('logo-header').src = moto.logo; // Cambia el logo dinámicamente
    document.getElementById('descripcion-header').textContent = moto.descripcion;
    document.getElementById('imagen-header').src = moto.imagenHeader;
    // Cambiar la imagen de fondo del header (si tienes uno)
    document.getElementById('header').style.backgroundImage = `url(${moto.fondoHeader})`;
    // Seccion ficha técnica
    // Actualizar el botón de ficha técnica
    const pdfFicha = document.getElementById('pdf-ficha');
    pdfFicha.href = moto.fichaTecnica; // Cambia el enlace al PDF
    pdfFicha.setAttribute('download', `${moto.nombre.replace(/\s+/g, '_')}-ficha-shotgun.pdf`);
    document.getElementById('imagen-ficha').src = moto.imagenFicha; // Cambia el logo dinámicamente
    document.getElementById('texto-ficha').textContent = moto.descripcionFicha;
    document.getElementById("potencia").textContent = moto.potencia;
    document.getElementById("cilindrada").textContent = moto.cilindrada;
    document.getElementById("sistema").textContent = moto.sistema;
    document.getElementById("luces").textContent = moto.luces;
    document.getElementById('imagen-form').src = moto.imagenForm;
    const iframe = document.getElementById('video');
    console.log('Iframe encontrado:', iframe); // Esto debería imprimir el iframe si está presente

    if (iframe) {
        console.log('Asignando URL al iframe:', moto.video); // Verifica la URL que estás asignando
        iframe.src = moto.video; // Asigna la URL al iframe
    } else {
        console.error('El iframe no se encuentra en el DOM');
    }
    // seccion moto q gira
      // Configuración inicial de la imagen de la moto y sus detalles
      let indiceImagenActual = 0; // Comenzamos con la primera imagen
      const imagenMoto = document.getElementById('imagen-moto-giratoria');
      const motoNombre = document.getElementById('moto-nombre');
      const motoDescripcion = document.getElementById('moto-descripcion');
  
      motoNombre.textContent = moto.nombre;
      motoDescripcion.textContent = moto.descripcionGira;
      imagenMoto.src = moto.colores[0].imagenes[indiceImagenActual]; // Muestra la primera imagen por defecto
  
      // Añade un evento de clic para cambiar la imagen de la moto
      imagenMoto.addEventListener('click', function () {
          indiceImagenActual = (indiceImagenActual + 1) % moto.colores[0].imagenes.length; // Avanza a la siguiente imagen en el array
          imagenMoto.src = moto.colores[0].imagenes[indiceImagenActual];
      });
    // seccion wallpaper
    const wallpaperGrid = document.querySelector('.wallpaper-grid');
    wallpaperGrid.innerHTML = ''; // Limpiar los wallpapers anteriores

    // Verificar si el array de wallpapers existe
    if (moto.wallpapers && moto.wallpapers.length > 0) {
        moto.wallpapers.forEach((wallpaper, index) => {
            const img = document.createElement('img');
            img.src = wallpaper;
            img.alt = `Wallpaper ${index + 1}`;
            img.id = `wallpaper-${index + 1}`; // Asigna un ID único para cada imagen
            img.classList.add('wallpaper-img'); // Agrega una clase para estilos CSS
            img.loading = 'lazy'; // Añade carga diferida
            wallpaperGrid.appendChild(img);
        });
    } else {
        console.error('No se encontraron wallpapers en los datos.');
    }

}
function generarOpcionesDeColor(moto) {
    const colorContainer = document.getElementById('color-container'); // Contenedor para los tanques de colores
    colorContainer.innerHTML = ''; // Limpiar opciones anteriores

    moto.colores.forEach((color, index) => {
        const tanqueImg = document.createElement('img');
        tanqueImg.src = color.tanque;
        tanqueImg.alt = `Tanque de color ${color.nombre}`;
        tanqueImg.classList.add('tanque-color'); // Clase para estilos
        tanqueImg.addEventListener('click', () => cambiarColorMoto(moto, index));
        colorContainer.appendChild(tanqueImg);
    });
}

function cambiarColorMoto(moto, colorIndex) {
    const imagenMoto = document.getElementById('imagen-moto-giratoria');
    let indiceImagenActual = 0;
    imagenMoto.src = moto.colores[colorIndex].imagenes[indiceImagenActual]; // Cambia a la primera imagen del nuevo color

    imagenMoto.addEventListener('click', function () {
        indiceImagenActual = (indiceImagenActual + 1) % moto.colores[colorIndex].imagenes.length; // Cambia a la siguiente imagen
        imagenMoto.src = moto.colores[colorIndex].imagenes[indiceImagenActual];
    });
}

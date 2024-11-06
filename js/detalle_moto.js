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

    const header = document.getElementById('header2');
    const logoImg = document.getElementById('logo-header2');

    // Añadir clase "loading" para mostrar un estado de carga inicial
    header.classList.add('loading');

    // Eliminar cualquier clase de modelo previa (para evitar conflictos)
    header.classList.remove('model1', 'model2', 'model3', 'model4', 'model5', 'model6', 'model7', 'model8', 'model9');

    // Agregar la nueva clase correspondiente al modelo actual
    header.classList.add(`model${moto.id}`);

    // Verificar que la imagen de fondo y logo existan
    const imageUrl = moto.fondoHeader2 || '';  // Imagen predeterminada si no hay fondo
    const logoUrl = moto.logo || '';  // Logo predeterminado si no hay logo

    // Función para manejar la carga de imágenes de fondo y logo
    function cargarImagen(src, callback) {
        const img = new Image();
        img.src = src;
        img.onload = callback;
        img.onerror = function () {
            console.error('Error cargando imagen:', src);
            callback();  // Continuar incluso si hay un error
        };
    }

    // Si existe una imagen de fondo, la pre-cargamos
    if (imageUrl) {
        cargarImagen(imageUrl, function () {
            // Aplicar la imagen de fondo una vez cargada
            header.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05)), url(${imageUrl})`;
            header.style.backgroundColor = '';  // Eliminar fondo gris
            header.classList.remove('loading');  // Remover el estado de carga
        });
    } else {
        // Si no hay imagen de fondo, aplicar el fondo gris inmediatamente
        header.style.backgroundImage = '';
        header.style.backgroundColor = '#f0f0f0';  // Fondo gris por defecto
        header.classList.remove('loading');
    }

    // Si hay un logo, lo pre-cargamos
    if (logoUrl) {
        cargarImagen(logoUrl, function () {
            logoImg.src = logoUrl;
            logoImg.style.display = 'block';  // Mostrar logo después de que cargue
        });
    } else {
        logoImg.style.display = 'none';  // Ocultar logo si no hay
    }

    // Cambiar la descripción del header dinámicamente
    document.getElementById('description-header2').textContent = moto.descripcion || 'Descripción predeterminada';

    // Seccion ficha técnica
    // Actualizar el botón de ficha técnica
    const pdfFicha = document.getElementById('pdf-ficha');
    pdfFicha.href = moto.fichaTecnica; // Cambia el enlace al PDF
    pdfFicha.setAttribute('download', `${moto.nombre.replace(/\s+/g, '_')}-ficha.pdf`);
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
    mostrarMotoGira(moto, 0); // Mostrar la primera imagen del primer color por defecto
    document.getElementById('moto-nombre').textContent = moto.nombre;
    document.getElementById('moto-descripcion').textContent = moto.descripcionGira;
    document.getElementById('logo-gira').src = moto.logoGira;
    // seccion wallpaper
    generarWallpapers(moto);


 // Cambiar tooltips de la moto
    generarTooltips(moto);



}
function generarWallpapers(moto) {
    const wallpaperGrid = document.querySelector('.wallpaper-grid');
    wallpaperGrid.innerHTML = ''; // Limpiar los wallpapers anteriores
    // Obtener los elementos del modal
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    // Verificar si el array de wallpapers existe
    if (moto.wallpapers && moto.wallpapers.length > 0) {
        moto.wallpapers.forEach((wallpaper, index) => {
            const img = document.createElement('img');
            img.src = wallpaper;
            img.alt = `Wallpaper ${index + 1}`;
            img.id = `wallpaper-${index + 1}`; // Asigna un ID único para cada imagen
            img.classList.add('wallpaper-img'); // Agrega una clase para estilos CSS
            img.loading = 'lazy'; // Añade carga diferida
            // Al hacer clic en una imagen, se abre el modal
            img.addEventListener('click', function () {
                modal.style.display = 'flex'; // Mostrar el modal
                modalImage.src = this.src; // Cambiar la imagen del modal
            });
            wallpaperGrid.appendChild(img);
        });
    } else {
        console.error('No se encontraron wallpapers en los datos.');
    }
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none'; // Cerrar el modal cuando se hace clic en el botón de cierre
    });

    modal.addEventListener('click', function (e) {
        if (e.target !== modalImage) {
            modal.style.display = 'none'; // Cerrar el modal cuando se hace clic fuera de la imagen
        }
    });
}

function generarOpcionesDeColor(moto) {
    const colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = ''; // Limpiar el contenido anterior

    moto.colores.forEach((color, index) => {
        // Crear un contenedor para la imagen y el nombre del color
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option'); // Añadir una clase para estilos

        // Crear la imagen del tanque
        const tanqueImg = document.createElement('img');
        tanqueImg.src = color.tanque;
        tanqueImg.alt = `Tanque de color ${color.nombre}`;
        tanqueImg.classList.add('tanque-color');
        tanqueImg.addEventListener('click', () => mostrarMotoGira(moto, index)); // Cambiar color al hacer clic

        // Crear el elemento para el nombre del color
        const colorNombre = document.createElement('span');
        colorNombre.textContent = color.nombre; // Asignar el nombre del color
        colorNombre.classList.add('color-nombre'); // Añadir una clase para estilos

        // Agregar la imagen y el nombre al contenedor
        colorOption.appendChild(tanqueImg);
        colorOption.appendChild(colorNombre);

        // Agregar el contenedor al colorContainer
        colorContainer.appendChild(colorOption);
    });
}


function mostrarMotoGira(moto, colorIndex) {
    const imagenMoto = document.getElementById('imagen-moto-giratoria');
    let indiceImagenActual = 0;

    // Mostrar la primera imagen del color seleccionado
    imagenMoto.src = moto.colores[colorIndex].imagenes[indiceImagenActual];

    // Eliminar cualquier evento anterior para evitar duplicaciones
    imagenMoto.replaceWith(imagenMoto.cloneNode(true));
    const nuevaImagenMoto = document.getElementById('imagen-moto-giratoria');

    // Añadir un nuevo evento de clic para cambiar la imagen
    nuevaImagenMoto.addEventListener('click', function () {
        indiceImagenActual = (indiceImagenActual + 1) % moto.colores[colorIndex].imagenes.length;
        nuevaImagenMoto.src = moto.colores[colorIndex].imagenes[indiceImagenActual];
    });
}

function generarTooltips(moto) {
    document.getElementById('moto-imagen').src = moto.imagenTooltip;
    
    // Genera los puntos interactivos según la información de 'moto'
    const container = document.querySelector('.moto-tooltip-container');
    container.innerHTML = ''; // Limpia los puntos previos

    // Inserta las imágenes nuevamente
    container.innerHTML += `
        <img id="logo-fondo" src="${moto.fondoTooltip}" alt="Logo de fondo" class="logo-fondo">
        <img id="moto-imagen" src="${moto.imagenTooltip}" alt="Imagen de la moto" class="moto-imagen">
         <div id="puntos-interactivos"></div> 
        `;
    
    const puntosContainer = document.getElementById('puntos-interactivos');
    puntosContainer.innerHTML = ''; // Limpiar puntos interactivos anteriores

    moto.detalles.forEach(detalle => {
        const puntoInteractivo = document.createElement('div');
        puntoInteractivo.classList.add('punto-interactivo');
        puntoInteractivo.style.top = detalle.posicion.top;
        puntoInteractivo.style.left = detalle.posicion.left;
        puntoInteractivo.dataset.text = detalle.descripcion;

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = detalle.nombre;

        puntoInteractivo.appendChild(tooltip);
        puntosContainer.appendChild(puntoInteractivo);
    });

    // Agregar eventos de tooltip
    document.querySelectorAll('.punto-interactivo').forEach(punto => {
        punto.addEventListener('mouseenter', function () {
            const tooltip = this.querySelector('.tooltip');
            tooltip.textContent = this.dataset.text;
            tooltip.style.display = 'block';  // Muestra el tooltip
        });
        punto.addEventListener('mouseleave', function () {
            const tooltip = this.querySelector('.tooltip');
            tooltip.style.display = 'none';  // Oculta el tooltip cuando no se esté en hover
        });
    });
}




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

    // Las siguientes secciones están comentadas porque aún no están implementadas

    
    // Seccion ficha técnica
   
    // Actualizar el botón de ficha técnica
    const pdfFicha = document.getElementById('pdf-ficha');
    pdfFicha.href = moto.fichaTecnica; // Cambia el enlace al PDF
    pdfFicha.setAttribute('download', `${moto.nombre.replace(/\s+/g, '_')}-ficha-shotgun.pdf`);
    document.getElementById('imagen-ficha').src = moto.imagenFicha; // Cambia el logo dinámicamente
    document.getElementById('texto-ficha').textContent = moto.descripcionFicha;
    document.getElementById('imagen-form').src = moto.imagenForm;
    const iframe = document.getElementById('video');
    console.log('Iframe encontrado:', iframe); // Esto debería imprimir el iframe si está presente

    if (iframe) {
        console.log('Asignando URL al iframe:', moto.video); // Verifica la URL que estás asignando
        iframe.src = moto.video; // Asigna la URL al iframe
    } else {
        console.error('El iframe no se encuentra en el DOM');
    }

   /*/ document.getElementById('imagen-gira').src = moto.imagenGira;

    // Colores
    const colorOptions = document.querySelector('.color-options');
    colorOptions.innerHTML = ''; // Limpiar las opciones anteriores
    moto.colores.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color.nombre.toLowerCase(); // Usar el nombre del color
        colorDiv.onclick = () => cambiarColor(color.imagen); // Cambiar la imagen cuando se selecciona un color
        colorOptions.appendChild(colorDiv);
    });*/

// Asumiendo que los datos de la moto ya se cargaron y se encuentran en la variable 'moto'
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
        wallpaperGrid.appendChild(img);
    });
} else {
    console.error('No se encontraron wallpapers en los datos.');
}





// Función para cambiar el color de la moto (por ahora no es necesario)
function cambiarColor(imagenRuta) {
    document.getElementById('imagen-gira').src = imagenRuta;
}

}
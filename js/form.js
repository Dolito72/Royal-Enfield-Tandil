document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    // Obtengo los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const modelo = document.getElementById('modelo').value;
    const mensaje = document.getElementById('consulta').value;

    // Envía la solicitud POST al servidor
    fetch('/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, telefono, modelo, mensaje })
    })
    .then(response => {
        const formContainer = document.getElementById('form');
        if (response.ok) {
            // Oculta el formulario
            formContainer.innerHTML = '<h4>¡Formulario enviado con éxito!</h4>'; // Mensaje de éxito
        } else {
            return response.json().then(errorData => {
                // Maneja el error
                formContainer.innerHTML = `<h4>Error: ${errorData.message}</h4>`; // Mensaje de error
            });
        }
    })
    .catch(error => {
        const formContainer = document.getElementById('form');
        formContainer.innerHTML = '<p>Error al enviar el formulario.</p>'; // Mensaje de error genérico
    });
});

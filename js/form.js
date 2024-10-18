document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    
    // Verifica si el formulario existe en la página actual
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío por defecto

            const formData = new FormData(form);

            // Hacer la petición fetch
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                const formContainer = document.querySelector('.form-container');
                
                if (response.ok) {
                    // Si la respuesta es exitosa
                    formContainer.innerHTML = '<h4>¡Formulario enviado con éxito!</h4><br><h4>¡Gracias!</h4>';
                } else {
                    return response.json().then(data => {
                        // Mostrar un error si lo hay
                        formContainer.innerHTML = `<h4>Error: ${data.error || 'Ocurrió un problema'}</h4>`;
                    });
                }
            })
            .catch(error => {
                const formContainer = document.querySelector('.form-container');
                formContainer.innerHTML = '<h4>Error al enviar el formulario.</h4>';
                console.error('Error:', error);
            });
        });
    }
});


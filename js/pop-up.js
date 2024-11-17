document.addEventListener("DOMContentLoaded", function() {
    const testRideBtn = document.getElementById("testRideBtn");
    const testRidePopup = document.getElementById("popupOverlay");
    testRidePopup.style.display = "none"; 
    const closePopup = document.getElementById("closeFormButton");
    const form = document.getElementById("testRideForm");
    const messageContainer = document.getElementById("messageContainer");

    // Mostrar el pop-up al hacer clic en el botón
    testRideBtn.addEventListener("click", function() {
        testRidePopup.style.display = "flex";
        form.style.display = "block"; // Muestra el formulario
        messageContainer.innerHTML = ""; // Limpia mensajes previos
    });

    // Ocultar el pop-up al hacer clic en el botón de cerrar
    closePopup.addEventListener("click", function() {
        testRidePopup.style.display = "none";
    });

    // Manejo del envío del formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío por defecto

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Muestra el mensaje de éxito
                messageContainer.innerHTML = "<h4>¡Formulario enviado con éxito!</h4><br><h4>¡Gracias!</h4>";
            } else {
                return response.json().then(data => {
                    // Muestra el mensaje de error si hay
                    messageContainer.innerHTML = `<h4>Error: ${data.error || 'Ocurrió un problema'}</h4>`;
                });
            }

            // Oculta el formulario y muestra solo el mensaje
            form.style.display = "none";
            
            // Cierra el pop-up después de 1 minuto
            setTimeout(() => {
                testRidePopup.style.display = "none";
                form.reset(); // Limpia el formulario
                form.style.display = "block"; // Restaura el formulario para el próximo uso
            }, 60000); // 60000 ms = 1 minuto
        })
        .catch(error => {
            messageContainer.innerHTML = '<h4>Error al enviar el formulario.</h4>';
            console.error('Error:', error);
        });
    });
});

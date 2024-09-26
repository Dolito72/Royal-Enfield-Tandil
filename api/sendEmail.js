import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv'; // Cargar variables de entorno

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const router = express.Router(); // Creamos un router de Express

// Ruta POST para enviar el correo
router.post('/', async (req, res) => {
    const { nombre, email, telefono, modelo, mensaje } = req.body;

    const data = {
        sender: { name: 'Royal Enfield', email: "doloparral@gmail.com" }, // Cambia esto por tu email
        to: [{ email: "doloparral@gmail.com" }],   // Cambia esto por tu email
        subject: "Nuevo formulario enviado",
        htmlContent: `<p>Nombre: ${nombre}</p><p>Email: ${email}</p><p>Teléfono: ${telefono}</p><p>Modelo de interés: ${modelo}</p><p>Consulta: ${mensaje}</p>`
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY // API Key de Brevo
            },
            body: JSON.stringify(data)
        });

        const jsonResponse = await response.json(); // Obtener la respuesta JSON

        if (response.ok) {
            res.status(200).send({ message: '¡Formulario enviado con éxito!' });
        } else {
            console.error('Error en Brevo:', jsonResponse); // Log del error para ver el contenido
            res.status(500).send({ message: 'Error al enviar el formulario.', error: jsonResponse }); // Retornar el error
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Log del error en la solicitud
        res.status(500).send({ message: 'Error al enviar el formulario.' });
    }
});

export default router; // Exporta el router correctamente

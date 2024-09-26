import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv'; // Para variables de entorno
import sendEmailRouter from './api/sendEmail.js'; // Importa el router desde sendEmail.js


dotenv.config(); // Carga las variables de entorno desde el archivo .env


const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.static('.')); // Sirve archivos estáticos desde la raíz del proyecto

// Ruta para el formulario principal
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html')); // Envía el archivo index.html
});

// Usa el router para la ruta '/sendEmail'
app.use('/sendEmail', sendEmailRouter); // Usa el router importado

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

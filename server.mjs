import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv'; // Para variables de entorno
import cors from 'cors'; // Importar CORS
import sendEmailRouter from './api/sendEmail.js'; // Importa el router desde sendEmail.js


dotenv.config(); // Carga las variables de entorno desde el archivo .env


const app = express();
const PORT = process.env.PORT || 3000; // En local usará 3000, en Docker o producción usará el valor de la variable PORT
app.use(cors()); // Permite solicitudes desde cualquier origen por defecto

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.static('.')); // Sirve archivos estáticos desde la raíz del proyecto

// Ruta para el formulario principal
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html')); // Envía el archivo index.html
});

// Usa el router para la ruta '/sendEmail'
app.use('/sendEmail', sendEmailRouter); // Usa el router importado

// Configurar el servidor para que escuche en todas las interfaces (no solo localhost)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

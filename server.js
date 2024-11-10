// server.js
const express = require('express');
const fetchWeatherData = require('./updateData');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

// Añadir el encabezado que indica a ngrok que no muestre la advertencia
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// Sirve los archivos estáticos (HTML, CSS, JavaScript) desde la carpeta actual
app.use(express.static('.'));

// Ruta para actualizar los datos del clima automáticamente antes de servir la página
app.get('/', async (req, res) => {
    try {
        // Actualiza los datos del clima
        await fetchWeatherData();

        // Sirve el archivo HTML después de actualizar los datos
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error('Error al actualizar los datos del clima:', error);
        res.status(500).send('Hubo un error al actualizar los datos del clima.');
    }
});

// Ruta para cargar el archivo JSON actualizado con los datos del clima
app.get('/data.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json')); // Envía el archivo JSON actualizado
});

// Asegúrate de que el servidor esté escuchando en todas las interfaces (0.0.0.0)
app.listen(4000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://localhost:4000');
  });
const express = require('express');
const fetchWeatherData = require('./updateData');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static('.'));

app.get('/', async (req, res) => {
    try {
        
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

// Inicia el servidor en el puerto proporcionado por Render o en el puerto 4000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  }).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
  });
  


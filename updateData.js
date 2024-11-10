
const axios = require('axios');
const fs = require('fs');


const apiKey = '697a5193e0278184ea94c96534eb72b9'; 
const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Barranquilla', 'Pereira', 'Bucaramanga', 'Santa Marta',
    'Cúcuta', 'Ibagué', 'Manizales', 'Pasto', 'Villavicencio', 'Tunja', 'Armenia', 'Quibdó', 'Sincelejo',
    'Riohacha', 'Popayán', 'Montería', 'Neiva', 'Valledupar', 'Leticia', 'San Andrés', 'Piedecuesta',
    'La Dorada', 'Bello', 'Soledad', 'Envigado', 'Yopal', 'Tuluá', 'Risaralda', 'Chía', 'Caldas', 'Sucre',
    'Buga', 'Tumaco', 'Girardot', 'San José del Guaviare', 'Sogamoso', 'Florencia', 'Mocoa', 'Chinchiná',
    'Ocaña', 'Yumbo', 'Turbaco', 'El Carmen de Bolívar', 'Honda', 'La Ceja', 'Puerto Colombia',
    'Zipaquirá', 'Río Negro', 'Caucasia', 'Santiago de Tolú', 'Barbosa', 'Agustín Codazzi', 'La Virginia',
    'Palmira', 'San Gil', 'Santa Rosa de Cabal', 'Rionegro', 'Fusagasugá', 'Calarcá', 'Sabaneta',
    'Chocontá', 'Bojacá', 'Anapoima', 'Canoas', 'La Vega', 'Riosucio', 'Cali',
    'Montelíbano', 'Aracataca', 'Magangué', 'Aguachica', 'El Banco', 'Aguazul', 'Becerril', 'Chiriguaná',
    'La Jagua de Ibirico', 'Ciénaga', 'Arenal', 'Buenaventura', 'Santiago de Cali'
];
 // Lista de ciudades

async function fetchWeatherData() {
    let weatherData = {};

    for (let city of cities) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
            const data = response.data;

            // Formatear la fecha a DD-MM-YYYY
            const today = new Date();
            const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

            // Guardar los datos de la ciudad en el objeto weatherData
            weatherData[city] = {
                temperature: data.main.temp,
                condition: data.weather[0].description,
                date: formattedDate,
                humidity: data.main.humidity,  
                wind_speed: data.wind.speed  
            };
        } catch (error) {
            console.error(`Error al obtener datos para la ciudad ${city}: ${error}`);
        }
    }

    // Guardar los datos en un archivo JSON
    fs.writeFileSync('data.json', JSON.stringify(weatherData, null, 2), 'utf-8');
    console.log('Archivo data.json generado correctamente');
}

fetchWeatherData().catch(error => console.error('Error al obtener los datos del clima:', error));

module.exports = fetchWeatherData;





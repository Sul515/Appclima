function obtenerPronostico() {
    const ciudadSeleccionada = document.getElementById('city').value.trim();

    if (ciudadSeleccionada === '') {
        alert('Por favor, selecciona una ciudad.');
        return;
    }

    // Cargar los datos del archivo JSON
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json(); // Convertir la respuesta en formato JSON
        })
        .then(data => {
            const clima = data[ciudadSeleccionada]; // Buscar la ciudad seleccionada

            if (clima) {
                mostrarPronostico(clima, ciudadSeleccionada);
            } else {
                alert('No se encontraron datos para la ciudad seleccionada.');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            alert('Hubo un problema al obtener el pronóstico. Inténtalo de nuevo.');
        });
}

// Función para mostrar el pronóstico del clima en la página
function mostrarPronostico(clima, ciudad) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h2>Pronóstico del Clima en ${ciudad}</h2>
        <p><strong>Temperatura:</strong> ${clima.temperature}°C</p>
        <p><strong>Condición:</strong> ${clima.condition}</p>
        <p><strong>Fecha:</strong> ${clima.date}</p>
        <p><strong>Humedad:</strong> ${clima.humidity}%</p>
        <p><strong>Viento:</strong> ${clima.wind_speed} m/s</p>
    `;
}

// Cargar las ciudades al desplegable (select)
function cargarCiudades() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('city');
            for (let ciudad in data) {
                const option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad;
                select.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar las ciudades:', error));
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarCiudades(); // Cargar las ciudades disponibles
    document.getElementById('obtenerPronosticoBtn').addEventListener('click', obtenerPronostico); // Asociar el botón con la función
});






//drop lists for user input
document.addEventListener('DOMContentLoaded', () => {
    fetch('countries+cities.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('country');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.iso2; 
                option.textContent = country.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});


function showweatherDetails(event) {
    event.preventDefault();
    // get cityName & countryCode from user 
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    // Open weather personal API Code
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key from https://openweathermap.org
    // get longitude and latitude
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;

    fetch(geocodingUrl)
    .then(response => response.json())
    .then(geoData => {
        if (geoData.length > 0) {
            const { lat, lon } = geoData[0];
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            // Call the weather API
            return fetch(apiUrl);
        } else {
            throw new Error('Geocoding API returned no results');
        }
    })
    .then(response => response.json())
    .then(data => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                            <p>Temperature: ${data.main.temp} &#8451;</p>
                            <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });       
}
document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );
// global variables
var longitude = "";
var latitude = "";
const JsonURL='https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bcities.json';
// drop list for countries 
document.addEventListener('DOMContentLoaded', () => {
        fetch(JsonURL)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('country');  // array of countries
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.iso2; 
                option.textContent = country.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
// drop list for cities
document.getElementById('country').addEventListener('change',()=>{
    console.log("country event")
    fetch(JsonURL)
    .then(response=>response.json())
    .then(data=>{
        const select = document.getElementById('city');
        const countryISO2 = document.getElementById('country').value;
        let cities = getCitiesByCountryId(data, countryISO2);   // array of cities
        select.innerHTML = ''; // Clear previous options
        cities.forEach(city=>{
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name;
            select.appendChild(option);
        })
    })
    .catch(error => console.error('Error loading JSON:', error));
})
// get the cities list based on the country id from the json file
function getCitiesByCountryId(data, countryId){
    const country = data.find(item=>item.iso2 === countryId);
    return country? country.cities:[];
}
// get city data after selecting the city
document.getElementById('city').addEventListener('change',()=>{
    const cityName = document.getElementById('city').value;
    console.log("city event");
    fetch(JsonURL)
    .then(response=>response.json())
    .then(data=>{
        const countryISO2 = document.getElementById('country').value;
        const citydata = getCityData(data, countryISO2, cityName);
        console.log(citydata);
        // update global variables with the citydata values
        longitude = citydata.longitude;
        latitude = citydata.latitude;
})
});
function getCityData(data, countryISO2,cityName){
    let cities = getCitiesByCountryId(data, countryISO2);   // array of cities
    if(cities){
        const citydata = cities.find(item=>item.name === cityName);
        return citydata? citydata : [];
    }
    return null;
}

function showweatherDetails(event) {
    event.preventDefault();
    // Open weather personal API Code
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key from https://openweathermap.org
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    // fetch the data from the API
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // display the weather data
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                            <p>Temperature: ${data.main.temp} &#8451;</p>
                            <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });       
}
document.getElementById('weatherForm').addEventListener('submit',showweatherDetails);

const apiKey = "";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("City not found.");
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    
    const cityName = data.name;
    const temp = data.main.temp;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const timezone = data.timezone / 3600;
    
    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Timezone:</strong> UTC${timezone >= 0 ? "+" : ""}${timezone}</p>
    `;
}
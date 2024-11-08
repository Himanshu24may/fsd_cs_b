const apiKey = "your-api-key-here";  // Replace with your actual OpenWeather API key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    // Corrected fetch URL with backticks for template literals
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("City not found. Please try again.");
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    
    const cityName = data.name;
    const temp = data.main.temp;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();  // Convert UTC to local time
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();  // Convert UTC to local time
    const timezoneOffset = data.timezone / 3600;  // Timezone offset in hours
    
    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Timezone:</strong> UTC${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset}</p>
    `;
}

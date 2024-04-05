const apiKey = 'YOUR_API_KEY';
        const city = 'New York'; // Change to desired city

        // Fetch weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('temperature').textContent = data.main.temp + "°C";
                document.getElementById('weather').textContent = data.weather[0].description;
                document.getElementById('wind-speed').textContent = data.wind.speed + " m/s";
                document.getElementById('humidity').textContent = data.main.humidity + "%";
            })
            .catch(error => console.error('Error fetching weather data:', error))
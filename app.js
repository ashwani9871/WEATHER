const apiKey = '99c3df48061950d0ab6187a7e4f8f495';

        const cityName = document.getElementById('city-name');
        const description = document.getElementById('description');
        const temperature = document.getElementById('temperature');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const searchButton = document.getElementById('search-button');
        const locationInput = document.getElementById('location');
        const weatherIcon = document.getElementById('weather-icon');

        // Fetch weather data based on user input
        searchButton.addEventListener('click', () => {
            const location = locationInput.value;
            if (location) {
                fetchWeatherData(location);
            }
        });

        // Fetch weather data based on user's geolocation
        window.onload = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherData(null, lat, lon);
                });
            }
        };

        async function fetchWeatherData(location, lat = null, lon = null) {
            let url;
            if (location) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Weather data not found');
                }
                const data = await response.json();
                updateWeatherUI(data);
            } catch (error) {
                alert(error.message);
            }
        }

        function updateWeatherUI(data) {
            cityName.textContent = data.name;
            description.textContent = data.weather[0].description;
            temperature.textContent = `${data.main.temp} °C`;
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
        }
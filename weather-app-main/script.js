document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const unitToggleButtons = document.querySelectorAll('.unit-toggle button');
    const currentIcon = document.getElementById('current-icon');
    const currentTemp = document.getElementById('current-temp');
    const currentLocation = document.getElementById('current-location');
    const currentDate = document.getElementById('current-date');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const precipitation = document.getElementById('precipitation');
    const dailyCardsContainer = document.getElementById('daily-cards');
    const hourlyDaySelector = document.getElementById('hourly-day-selector');
    const hourlyCardsContainer = document.getElementById('hourly-cards');
    let currentUnits = 'metric'; 
    let weatherData = null;

    async function getWeatherData(city) {
        try {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
                alert('City not found. Please try again.');
                return;
            }
            const { latitude, longitude, name, admin1, country } = geoData.results[0];
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`);
            const data = await weatherResponse.json();
            
            weatherData = { ...data, location: { name, region: admin1, country } };
            updateUI();

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please check your connection and try again.');
        }
    }

    function updateUI() {
        if (!weatherData) return;
        updateCurrentWeather();
        updateDailyForecast();
        updateHourlyForecast(0); 
        setupHourlyDaySelector();
    }

    function updateCurrentWeather() {
        const { current_weather, hourly, location } = weatherData;
        const isMetric = currentUnits === 'metric';

        // Icon
        currentIcon.src = getWeatherIcon(current_weather.weathercode);
        currentIcon.alt = getWeatherDescription(current_weather.weathercode);

        // Temperature
        const temp = isMetric ? current_weather.temperature : toFahrenheit(current_weather.temperature);
        currentTemp.innerHTML = `${Math.round(temp)}&deg;`;

        // Location & Date
        currentLocation.textContent = `${location.name}, ${location.region || location.country}`;
        currentDate.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        // Find the index for the current hour to get accurate metrics
        const now = new Date();
        const currentHourIndex = hourly.time.findIndex(t => new Date(t).getHours() === now.getHours());
        const index = currentHourIndex !== -1 ? currentHourIndex : 0;

        // Metrics
        const feelsLikeTemp = isMetric ? hourly.apparent_temperature[index] : toFahrenheit(hourly.apparent_temperature[index]);
        feelsLike.textContent = `${Math.round(feelsLikeTemp)}°`;
        
        humidity.textContent = `${hourly.relativehumidity_2m[index]}%`;

        const windSpeed = isMetric ? current_weather.windspeed : toMph(current_weather.windspeed);
        const windUnit = isMetric ? 'km/h' : 'mph';
        wind.textContent = `${Math.round(windSpeed)} ${windUnit}`;

        const precip = isMetric ? hourly.precipitation[index] : toInches(hourly.precipitation[index]);
        const precipUnit = isMetric ? 'mm' : 'in';
        precipitation.textContent = `${precip.toFixed(1)} ${precipUnit}`;
    }

    function updateDailyForecast() {
        const { daily } = weatherData;
        dailyCardsContainer.innerHTML = '';

        daily.time.forEach((dateStr, i) => {
            const day = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
            const high = currentUnits === 'metric' ? daily.temperature_2m_max[i] : toFahrenheit(daily.temperature_2m_max[i]);
            const low = currentUnits === 'metric' ? daily.temperature_2m_min[i] : toFahrenheit(daily.temperature_2m_min[i]);

            const card = document.createElement('div');
            card.className = 'day-card';
            card.innerHTML = `
                <div class="day">${i === 0 ? 'Today' : day}</div>
                <img src="${getWeatherIcon(daily.weathercode[i])}" alt="${getWeatherDescription(daily.weathercode[i])}" class="icon">
                <div class="temps">
                    <span class="high">${Math.round(high)}&deg;</span>
                    <span class="low">${Math.round(low)}&deg;</span>
                </div>
            `;
            dailyCardsContainer.appendChild(card);
        });
    }

    function setupHourlyDaySelector() {
        hourlyDaySelector.innerHTML = '';
        weatherData.daily.time.forEach((dateStr, i) => {
            const day = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
            const button = document.createElement('button');
            button.textContent = i === 0 ? 'Today' : day;
            if (i === 0) button.classList.add('active');
            button.addEventListener('click', () => {
                document.querySelector('#hourly-day-selector .active').classList.remove('active');
                button.classList.add('active');
                updateHourlyForecast(i);
            });
            hourlyDaySelector.appendChild(button);
        });
    }

    function updateHourlyForecast(dayIndex) {
        const { hourly } = weatherData;
        hourlyCardsContainer.innerHTML = '';

        const start = dayIndex * 24;
        const end = start + 24;

        for (let i = start; i < end; i++) {
            const time = new Date(hourly.time[i]).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            const temp = currentUnits === 'metric' ? hourly.temperature_2m[i] : toFahrenheit(hourly.temperature_2m[i]);

            const card = document.createElement('div');
            card.className = 'hour-card';
            card.innerHTML = `
                <div class="time">${time}</div>
                <img src="${getWeatherIcon(hourly.weathercode[i])}" alt="${getWeatherDescription(hourly.weathercode[i])}" class="icon">
                <div class="temp">${Math.round(temp)}&deg;</div>
            `;
            hourlyCardsContainer.appendChild(card);
        }
    }


    const toFahrenheit = (celsius) => (celsius * 9/5) + 32;
    const toMph = (kph) => kph / 1.609;
    const toInches = (mm) => mm / 25.4;

    function getWeatherIcon(code) {
        if ([0, 1].includes(code)) return './assets/images/icon-partly-cloudy.webp'; // Using partly cloudy for clear as no clear icon exists
        if ([2, 3].includes(code)) return './assets/images/icon-overcast.webp';
        if ([45, 48].includes(code)) return './assets/images/icon-fog.webp';
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return './assets/images/icon-rain.webp';
        if ([71, 73, 75, 77, 85, 86].includes(code)) return './assets/images/icon-snow.webp';
        if ([95, 96, 99].includes(code)) return './assets/images/icon-storm.webp';
        return './assets/images/icon-partly-cloudy.webp';
    }

    function getWeatherDescription(code) {
        const descriptions = {
            0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Fog', 48: 'Depositing rime fog',
            51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
            61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
            71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
            80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
            95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown';
    }


    searchButton.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    unitToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) return;

            document.querySelector('.unit-toggle .active').classList.remove('active');
            button.classList.add('active');
            
            currentUnits = button.dataset.unit;
            updateUI();
        });
    });

    getWeatherData('New York'); 
});
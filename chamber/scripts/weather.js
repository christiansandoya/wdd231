document.addEventListener('DOMContentLoaded', () => {
    const currentWeatherContainer = document.getElementById('current-weather');
    const forecastWeatherContainer = document.getElementById('forecast-weather');

    if (!currentWeatherContainer && !forecastWeatherContainer) return;

    // Lima Peru coordinates
    const lat = -12.0464;
    const lon = -77.0428;
    const apiKey = '3fdf630578e947881aff4497289fe4c9';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function apiFetch() {
        try {
            const [currentRes, forecastRes] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            if (currentRes.ok) {
                const currentData = await currentRes.json();
                displayCurrentWeather(currentData);
            }

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                displayForecastWeather(forecastData);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayCurrentWeather(data) {
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        currentWeatherContainer.innerHTML = `
            <div class="current-weather-info">
                <img src="${iconUrl}" alt="${desc}" width="50" height="50">
                <p><strong>Temperature:</strong> ${temp}°C</p>
                <p><strong>Condition:</strong> ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
            </div>
        `;
    }

    function displayForecastWeather(data) {
        const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
        
        let html = '<h3>3-Day Forecast</h3><div class="forecast-grid">';
        
        forecastList.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            html += `
                <div class="forecast-day">
                    <p><strong>${dayName}</strong></p>
                    <img src="${iconUrl}" alt="${day.weather[0].description}" width="40" height="40">
                    <p>${temp}°C</p>
                </div>
            `;
        });
        html += '</div>';
        
        forecastWeatherContainer.innerHTML = html;
    }

    apiFetch();
});
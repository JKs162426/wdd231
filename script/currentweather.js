const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const todayForecast = document.querySelector('#today-forecast');
const tomorrowForecast = document.querySelector('#tomorrow-forecast');
const dayAfterTomorrowForecast = document.querySelector('#day-after-tomorrow-forecast');

const apiKey = 'c0ed5e4f830486c0424df70d42962d4a';
const city = 'Caracas,ve';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
        currentTemp.textContent = 'Weather data not available at this time.';
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `<strong>${data.main.temp.toFixed(0)}</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = data.weather[0].description;

    highTemp.textContent = data.main.temp_max.toFixed(0);
    lowTemp.textContent = data.main.temp_min.toFixed(0);
    humidity.textContent = data.main.humidity;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunrise.textContent = sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    sunset.textContent = sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const today = new Date().getDate();

    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    let count = 0;
    for (let i = 0; i < dailyForecasts.length && count < 3; i++) {
        const date = new Date(dailyForecasts[i].dt * 1000);
        if (date.getDate() !== today) {
            const desc = `${dailyForecasts[i].weather[0].description}, ${dailyForecasts[i].main.temp.toFixed(1)}°C`;
            if (count === 0) todayForecast.textContent = desc;
            if (count === 1) tomorrowForecast.textContent = desc;
            if (count === 2) dayAfterForecast.textContent = desc;
            count++;
        }
    }
}

apiFetch();
fetchForecast();

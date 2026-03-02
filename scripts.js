document.getElementById('getWeatherBtn').addEventListener('click', () => {

    const city = document.getElementById('cityInput').value.trim();

    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city.');
    }
});

const apiKey = '088c2dbf027811122a6f552130b1d1bf';

async function getWeather(city) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = 'Loading...';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p style="font-family: 'Instrument Serif', serif; font-size: 2vw; color: #1C1717;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;

    const tempC = main.temp;
    const tempF = (tempC * 9 / 5) + 32;

    document.getElementById('weatherResult').innerHTML = `
    <h2 class="cityname">${name}</h2>
    <p class="description">
      ${weather[0].description}
    </p>
    <p class="temp">Temperature: ${tempC.toFixed(1)} °C | ${tempF.toFixed(1)} °F</p>
  `;
}
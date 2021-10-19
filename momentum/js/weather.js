const weatherIconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature');
const weatherDescriptionElement = document.querySelector('.weather-description');
const weatherErrorElement = document.querySelector('.weather-error');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const cityElement = document.querySelector('.city');
cityElement.value = 'Minsk';

const setLocalStorage = () => {
  localStorage.setItem('city', cityElement.value);
};

const getLocalStorage = () => {
  if (localStorage.getItem('city')) {
    cityElement.value = localStorage.getItem('city');
  }
};

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const getWeather = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.value}&lang=en&appid=82b4be9951e608401e6001c3e4618245&units=metric`; 
    const res = await fetch(url);
    const data = await res.json();

    if (res.status >= 400 && res.status <= 600) {
      weatherErrorElement.textContent = 'Invalid location. \n Please enter a correct city name.';
      weatherIconElement.className = 'weather-icon owf';
      temperatureElement.textContent = '';
      weatherDescriptionElement.textContent = '';
      windElement.textContent = '';
      humidityElement.textContent = '';
      return;
    }    
   
    weatherErrorElement.textContent = '';
    weatherIconElement.className = 'weather-icon owf';
    weatherIconElement.classList.add(`owf-${data.weather[0].id}`);
    temperatureElement.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescriptionElement.textContent = data.weather[0].description;
    windElement.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
    humidityElement.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
  } catch (err) {
    console.log(err);
  }
};

const setCity = (e) => {
  if (e.code === 'Enter') {
    getWeather();
    cityElement.blur();
  }
};

cityElement.addEventListener('keypress', setCity);

export default getWeather;

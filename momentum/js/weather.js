import { currentState, contentTranslation } from './settings.js';

const weatherIconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature');
const weatherDescriptionElement = document.querySelector('.weather-description');
const weatherErrorElement = document.querySelector('.weather-error');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const cityElement = document.querySelector('.city');
cityElement.value = localStorage.getItem('city') || 'Minsk';

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

const getWeather = async (state) => {
  const { lang } = state; 

  try {    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.value}&lang=${lang}&appid=82b4be9951e608401e6001c3e4618245&units=metric`; 
    const res = await fetch(url);
    const data = await res.json();

    if (res.status >= 400 && res.status <= 600) {
      weatherErrorElement.textContent = contentTranslation.weather.error[lang];
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
    windElement.textContent = `${contentTranslation.weather.wind[lang]} ${Math.floor(data.wind.speed)} ${contentTranslation.weather.unit[lang]}`;
    humidityElement.textContent = `${contentTranslation.weather.humidity[lang]} ${Math.floor(data.main.humidity)}%`;
  } catch (err) {
    console.log(err);
  }
};

const setCity = (e) => {
  if (e.code === 'Enter') {
    setLocalStorage();  
    getWeather(currentState);
    cityElement.blur();
  }
};

cityElement.addEventListener('keypress', setCity);

export default getWeather;

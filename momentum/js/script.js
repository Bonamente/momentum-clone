import showTime from './time-date.js';
import setBg from './slider.js';
import getWeather from './weather.js';

setBg();
showTime();

document.addEventListener('DOMContentLoaded', getWeather);

import { checkInputs, renderBlocks } from './settings.js';
import showTime from './time-date.js';
import setBg from './slider.js';
import getWeather from './weather.js';
import getQuote from './quotes.js';
import './audio-player.js';
import './menu.js';

checkInputs();
renderBlocks();
setBg();
showTime();

document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);

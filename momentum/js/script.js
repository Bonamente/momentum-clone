import { checkLangToggles, checkInputs, renderBlocks, currentState, changeSettingsLang } from './settings.js';
import { showTime } from './time-date.js';
import setBg from './slider.js';
import getWeather from './weather.js';
import getQuote from './quotes.js';
import './audio-player.js';
import './menu.js';
import './todo.js';

checkInputs();
checkLangToggles(currentState);
changeSettingsLang(currentState);
renderBlocks();
setBg();
showTime(currentState);

document.addEventListener('DOMContentLoaded', getWeather(currentState));
document.addEventListener('DOMContentLoaded', getQuote(currentState));

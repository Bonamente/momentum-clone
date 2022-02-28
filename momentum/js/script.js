import { 
  checkLangToggles,
  checkInputs,
  checkTagInputs,
  renderBlocks, 
  currentState, 
  changeSettingsLang, 
  changeTodoLang,  
} from './settings.js';
import { showTime } from './time-date.js';
import setBg from './slider.js';
import getWeather from './weather.js';
import getQuote from './quotes.js';
import './audio-player.js';
import './menu.js';
import './todo.js';

checkInputs();
checkTagInputs(currentState);
checkLangToggles(currentState);
changeSettingsLang(currentState);
changeTodoLang(currentState);
renderBlocks();
setBg(currentState);
showTime(currentState);

document.addEventListener('DOMContentLoaded', getWeather(currentState));
document.addEventListener('DOMContentLoaded', getQuote(currentState));

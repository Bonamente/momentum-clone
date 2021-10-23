import { showGreeting } from './greeting.js';

const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

export let timerId;

const showDate = (date, curLang) => {  
  const options = (curLang === 'en') 
    ? { weekday: 'long', month: 'long', day: 'numeric' }
    : { weekday: 'long', day: 'numeric', month: 'long' };

  const format = (curLang === 'en') ? 'en-US' : 'ru';

  const currentDate = date.toLocaleDateString(`${format}`, options);
  const dateToShow = (curLang === 'en') 
    ? currentDate
    : currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  dateElement.textContent = dateToShow;
};

export const showTime = (state) => {
  const { lang } = state;
 
  const date = new Date();
  const currentTime = date.toLocaleTimeString('ru'); 

  timeElement.textContent = currentTime;

  showDate(date, lang);
  showGreeting(date, lang);

  timerId = setTimeout(showTime, 1000, state);  
};

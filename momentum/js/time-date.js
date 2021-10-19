import showGreeting from './greeting.js';

const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

const showDate = (date) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-US', options);

  dateElement.textContent = currentDate;
};

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  timeElement.textContent = currentTime;

  showDate(date);
  showGreeting(date);

  setTimeout(showTime, 1000);
};

export default showTime;

const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');

const setLocalStorage = () => {
  localStorage.setItem('name', nameElement.value);
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    nameElement.value = localStorage.getItem('name');
  }
};

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

export const getTimeOfDay = (hours) => {
  const partsOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const timeOfDay= partsOfDay[Math.floor(hours /6)];

  return timeOfDay;
};

export const showGreeting = (date) => { 
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const greetingText = `Good ${timeOfDay}`;

  greetingElement.textContent = greetingText;
};

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
  switch (hours) {
    case 6: 
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return 'morning';
      break;
    case 12:
    case 13: 
    case 14:
    case 15:
    case 16:
    case 17:    
      return 'afternoon';
      break;
    case 18:     
    case 19: 
    case 20:
    case 21:
    case 22:
    case 23:
      return 'evening';
      break;
    default:
      return 'night';
  }
};

export const showGreeting = (date) => { 
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const greetingText = `Good ${timeOfDay}`;

  greetingElement.textContent = greetingText;
};

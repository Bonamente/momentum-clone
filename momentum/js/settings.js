const elements = {
  player: document.querySelector('.player'),
  weather: document.querySelector('.weather'),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  greeting: document.querySelector('.greeting-container'),
  quotes: document.querySelector('.quotes-container'),
  // todo: document.querySelector('.todo-container'),
};

const inputs = {
  player: document.getElementById('player'),
  weather: document.getElementById('weather'),
  time: document.getElementById('time'),
  date: document.getElementById('date'),
  greeting: document.getElementById('greeting'),
  quotes: document.getElementById('quotes'),
  //todo: document.getElementById('todo'),
};

const state = {
  language: 'en',
  photoSource: 'github',
  pageBlocks: [
    { name: 'time', isShow: true },
    { name: 'date', isShow: true },
    { name: 'greeting', isShow: true },
    { name: 'quotes', isShow: true },
    { name: 'weather', isShow: true },
    { name: 'player', isShow: true },
    // { name: 'todo', isShow: true },
  ],
};

let currentState = JSON.parse(localStorage.getItem('state')) || state;

const setLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(currentState));
};

const getLocalStorage = () => {
  if (localStorage.getItem('state')) {
    const savedState = JSON.parse(localStorage.getItem('state'));
    currentState = savedState;    
  }
};

// console.log(JSON.parse(localStorage.getItem('state')));

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const entries = Object.entries(inputs);

export const checkInputs = () => {
  currentState.pageBlocks.forEach(({ name, isShow }) => {
    inputs[name].checked = isShow;
  })
};

export const renderBlocks = () => {
  currentState.pageBlocks.forEach((block) => {
    if (block.isShow) {
      elements[block.name].classList.remove('hide');
      elements[block.name].classList.add('show');      
    } else {
      elements[block.name].classList.remove('show');
      elements[block.name].classList.add('hide');      
    }    
  });     
};

for (const [name, el] of entries) {
  el.addEventListener('change', ({ target }) => {    
    const pageBlock = currentState.pageBlocks.find((el) => el.name == target.id);    

    if (target.checked) {      
      pageBlock.isShow = true;      
      setLocalStorage();
      renderBlocks();
    } else {
      pageBlock.isShow = false;      
      setLocalStorage();
      renderBlocks();
    }
  })
}

import getWeather from './weather.js';
import { timerId, showTime } from './time-date.js';
import getQuote from './quotes.js';

const cityElement = document.querySelector('.city');

const langToggle = document.getElementById('language-toggle');
const settingsLangToggle = document.getElementById('settings-language-toggle');

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

const elements = {
  player: document.querySelector('.player'),
  weather: document.querySelector('.weather'),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  greeting: document.querySelector('.greeting-container'),
  quotes: document.querySelector('.quotes-container'),
  todo: document.querySelector('.todo-container'),
};

const inputs = {  
  player: document.getElementById('player'),
  weather: document.getElementById('weather'),
  time: document.getElementById('time'),
  date: document.getElementById('date'),
  greeting: document.getElementById('greeting'),
  quotes: document.getElementById('quotes'),
  todo: document.getElementById('todo'),
};

const settingNames = {
  title: document.getElementById('name-settings'),
  lang: document.getElementById('name-lang'),
  audio: document.getElementById('name-audio'),
  weather: document.getElementById('name-weather'),
  time: document.getElementById('name-time'),
  date: document.getElementById('name-date'),
  greeting: document.getElementById('name-greeting'),
  quotes: document.getElementById('name-quotes'),
  todo: document.getElementById('name-todo'),
  photo: document.getElementById('name-photo'),
  photoSmall: document.getElementById('name-photo-small'),
};

const todoNames = {
  title: document.getElementById('title-todo'),
  add: document.getElementById('add-task-button'),
  unfinished: document.getElementById('unfinished-title-todo'),
  completed: document.getElementById('completed-title-todo'),
  edit: document.querySelectorAll('.edit-todo'),
  delete: document.querySelectorAll('.delete-todo'),
};

const state = {
  lang: 'en',  
  photoSource: 'github',
  pageBlocks: [
    { name: 'time', isShow: true },
    { name: 'date', isShow: true },
    { name: 'greeting', isShow: true },
    { name: 'quotes', isShow: true },
    { name: 'weather', isShow: true },
    { name: 'player', isShow: true },
    { name: 'todo', isShow: true },
  ],
};

export const contentTranslation = {
  weather: {
    wind: {
      en: 'Wind speed:',
      ru: 'Скорость ветра:',
    },
    unit: {
      en: 'm/s',
      ru: 'м/с',
    },
    humidity: {
      en: 'Humidity:',
      ru: 'Влажность:',
    },
  },
  greeting: {    
    en: {
      night: 'Good night',
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      placeholder: '[Enter name]',
    },
    ru: {
      night: 'Доброй ночи',
      morning: 'Доброе утро',
      afternoon: 'Добрый день',
      evening: 'Добрый вечер',
      placeholder: '[Введите имя]',
    }
  },
  settings: {
    title: {
      en: 'Settings',
      ru: 'Настройки',
    },
    lang: {
      en: 'Language',
      ru: 'Язык',
    },
    audio: {
      en: 'Audio player',
      ru: 'Аудио плеер',
    },
    weather: {
      en: 'Weather',
      ru: 'Погода',
    },
    date: {
      en: 'Date',
      ru: 'Дата',
    },
    time: {
      en: 'Time',
      ru: 'Время',
    },
    greeting: {
      en: 'Greeting',
      ru: 'Приветствие',
    },
    quotes: {
      en: 'Quotes',
      ru: 'Цитаты',
    },
    todo: {
      en: 'Todo',
      ru: 'Список дел',
    },
    photo: {
      en: 'Photos',
      ru: 'Фотографии',
    },
    photoSmall: {
      en: ' (select your preferred photo source)',
      ru: ' (выберите источник фото)',
    },
  },
  todo: {
    title: {
      en: 'New Todo',
      ru: 'Новая задача',
    },
    add: {
      en: 'Add',
      ru: 'Добавить',
    },
    unfinished: {
      en: 'Todo list',
      ru: 'Список задач',
    },
    completed: {
      en: 'Completed',
      ru: 'Завершённые',
    },
    edit: {
      en: 'Edit',
      ru: 'Изменить',
    },
    delete: {
      en: 'Delete',
      ru: 'Удалить',
    },
  }
};

export let currentState = JSON.parse(localStorage.getItem('state')) || state;

const setLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(currentState));
};

const getLocalStorage = () => {
  if (localStorage.getItem('state')) {
    const savedState = JSON.parse(localStorage.getItem('state'));
    currentState = savedState;    
  }
};

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const inputEntries = Object.entries(inputs);
const settingEntries = Object.entries(settingNames);
const todoEntries = Object.entries(todoNames);

export const changeSettingsLang = (state) => {
  const { lang } = state;

  for (const [name, el] of settingEntries) {   
    el.textContent = contentTranslation.settings[name][lang];
  }

  settingNames.photo.append(settingNames.photoSmall);
};

export const changeTodoLang = (state) => {
  const { lang } = state;

  for (const [name, el] of todoEntries) {
    if (el instanceof NodeList) {
      el.forEach((item) => {
        item.textContent = contentTranslation.todo[name][lang];
      })
    }  
    
    el.textContent = contentTranslation.todo[name][lang];
  }  
};

export const checkInputs = () => {
  currentState.pageBlocks.forEach(({ name, isShow }) => {
    inputs[name].checked = isShow;
  })
};

export const checkLangToggles = (currentState) => {
  const { lang } = currentState;
  if (lang === 'en') {
    langToggle.checked = false;
    settingsLangToggle.checked = false;
  } else {
    langToggle.checked = true;
    settingsLangToggle.checked = true;
  }
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

const translateQuote = async (state) => {
  const { lang } = state;

  const quotes = 'js/data.json';
  const res = await fetch(quotes, {mode: 'no-cors'});
  const data = await res.json();
  const quoteId = quoteElement.getAttribute('data-quote');
  const [ quote ] = data.filter((quote) => quote.id === +quoteId);  

  if (lang === 'en') {
    quoteElement.textContent = `"${quote.textEn}"`;
    authorElement.textContent = `${quote.authorEn}`; 
  } else {
    quoteElement.textContent = `"${quote.textRu}"`;
    authorElement.textContent = `${quote.authorRu}`;  
  }  
};

for (const [name, el] of inputEntries) {
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

langToggle.addEventListener('change', ({ target }) => {
  if (target.checked) {
    currentState.lang = 'ru';
    settingsLangToggle.checked = true;

    if (cityElement.value === 'Minsk') {
      cityElement.value = 'Минск';
    }
  
    clearTimeout(timerId);
    showTime(currentState);
    getWeather(currentState);
    changeSettingsLang(currentState);
    translateQuote(currentState);
    changeTodoLang(currentState);
  } else {
    currentState.lang = 'en';
    settingsLangToggle.checked = false;
    
    if (cityElement.value === 'Минск') {
      cityElement.value = 'Minsk';
    }

    clearTimeout(timerId);
    showTime(currentState);
    getWeather(currentState);
    changeSettingsLang(currentState);
    translateQuote(currentState);
    changeTodoLang(currentState); 
  }
});

settingsLangToggle.addEventListener('change', ({ target }) => {
  if (target.checked) {
    currentState.lang = 'ru';
    langToggle.checked = true;

    if (cityElement.value === 'Minsk') {
      cityElement.value = 'Минск';
    }
  
    clearTimeout(timerId);
    showTime(currentState);
    getWeather(currentState);
    changeSettingsLang(currentState);
    getQuote(currentState);
    changeTodoLang(currentState);
  } else {
    currentState.lang = 'en';
    langToggle.checked = false;
    
    if (cityElement.value === 'Минск') {
      cityElement.value = 'Minsk';
    }

    clearTimeout(timerId);
    showTime(currentState);
    getWeather(currentState);
    changeSettingsLang(currentState);
    getQuote(currentState);
    changeTodoLang(currentState);  
  }
});

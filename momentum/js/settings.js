import getWeather from './weather.js';
import { timerId, showTime } from './time-date.js';
import getQuote from './quotes.js';
import setBg from './slider.js';

const cityElement = document.querySelector('.city');

const langToggle = document.getElementById('language-toggle');
const settingsLangToggle = document.getElementById('settings-language-toggle');

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

const githubInput = document.getElementById('github');
const unsplashInput = document.getElementById('unsplash');
const flickrInput = document.getElementById('flickr');
const tagInput = document.getElementById('tag');

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
  tag: document.getElementById('name-tags'),
  tagSmall: document.getElementById('name-tag-small'),
  tagAnd: document.getElementById('name-and'),
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
  imgSource: 'github',
  imgTag: '',
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
      ru: '???????????????? ??????????:',
    },
    unit: {
      en: 'm/s',
      ru: '??/??',
    },
    humidity: {
      en: 'Humidity:',
      ru: '??????????????????:',
    },
    error: {
      en: 'Invalid location. \n Please enter a correct city name.',
      ru: '???????????????? ????????????????. ????????????????????, ?????????????? ???????????????????? ????????????????.',
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
      night: '???????????? ????????',
      morning: '???????????? ????????',
      afternoon: '???????????? ????????',
      evening: '???????????? ??????????',
      placeholder: '[?????????????? ??????]',
    },
  },
  settings: {
    title: {
      en: 'Settings',
      ru: '??????????????????',
    },
    lang: {
      en: 'Language',
      ru: '????????',
    },
    audio: {
      en: 'Audio player',
      ru: '?????????? ??????????',
    },
    weather: {
      en: 'Weather',
      ru: '????????????',
    },
    date: {
      en: 'Date',
      ru: '????????',
    },
    time: {
      en: 'Time',
      ru: '??????????',
    },
    greeting: {
      en: 'Greeting',
      ru: '??????????????????????',
    },
    quotes: {
      en: 'Quotes',
      ru: '????????????',
    },
    todo: {
      en: 'Todo',
      ru: '???????????? ??????',
    },
    photo: {
      en: 'Photos',
      ru: '????????????????????',
    },
    photoSmall: {
      en: ' (select your preferred photo source)',
      ru: ' (???????????????? ???????????????? ????????)',
    },
    tag: {
      en: 'Tags',
      ru: '????????',
    },
    tagSmall: {
      en: 'available for',
      ru: '???????????????? ??????',
    },
    tagAnd: {
      en: '&',
      ru: '??',
    },
  },
  todo: {
    title: {
      en: 'New Todo',
      ru: '?????????? ????????????',
    },
    add: {
      en: 'Add',
      ru: '????????????????',
    },
    unfinished: {
      en: 'Todo list',
      ru: '???????????? ??????????',
    },
    completed: {
      en: 'Completed',
      ru: '??????????????????????',
    },
    edit: {
      en: 'Edit',
      ru: '????????????????',
    },
    delete: {
      en: 'Delete',
      ru: '??????????????',
    },
  },
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
      });
    }

    el.textContent = contentTranslation.todo[name][lang];
  }
};

export const checkInputs = () => {
  currentState.pageBlocks.forEach(({ name, isShow }) => {
    inputs[name].checked = isShow;
  });
};

export const checkTagInputs = (currentState) => {
  const activeInput = currentState.imgSource;
  const selectedTag = currentState.imgTag;

  tagInput.value = selectedTag;

  [githubInput, unsplashInput, flickrInput].forEach((input) => {
    if (input.value === activeInput) {
      input.checked = true;
    } else {
      input.checked = false;
    }
  });
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
  const res = await fetch(quotes, { mode: 'no-cors' });
  const data = await res.json();
  const quoteId = quoteElement.getAttribute('data-quote');
  const [quote] = data.filter((quote) => quote.id === +quoteId);

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
    const pageBlock = currentState.pageBlocks.find(
      (el) => el.name == target.id
    );

    if (target.checked) {
      pageBlock.isShow = true;
      setLocalStorage();
      renderBlocks();
    } else {
      pageBlock.isShow = false;
      setLocalStorage();
      renderBlocks();
    }
  });
}

langToggle.addEventListener('change', ({ target }) => {
  if (target.checked) {
    currentState.lang = 'ru';
    settingsLangToggle.checked = true;

    if (cityElement.value === 'Minsk') {
      cityElement.value = '??????????';
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

    if (cityElement.value === '??????????') {
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
      cityElement.value = '??????????';
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

    if (cityElement.value === '??????????') {
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

[githubInput, unsplashInput, flickrInput].forEach((input) => {
  input.addEventListener('click', ({ target }) => {
    if (target.checked) {
      currentState.imgSource = target.value;
      setLocalStorage();
      setBg(currentState);
    }
  });
});

tagInput.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    currentState.imgTag = e.target.value;
    setLocalStorage();
    setBg(currentState);
    tagInput.blur();
  }
});

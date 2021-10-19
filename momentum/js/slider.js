import { getTimeOfDay } from './greeting.js';

const bodyElement = document.body;
const slidePrevElement = document.querySelector('.slide-prev');
const slideNextElement = document.querySelector('.slide-next');

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let randomNum;
randomNum = getRandomNum(1, 20);

const setBg = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const bgNum = String(randomNum).padStart(2, '0');

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Bonamente/momentum-app-images/main/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    bodyElement.style.backgroundImage = `url(${img.src})`;   
  };
};

const getSlideNext = () => {
  randomNum = ((randomNum + 1) % 21) > 0 
    ? (randomNum + 1) % 21
    : 1;
  
  setBg();
};

const getSlidePrev = () => {
  randomNum = (randomNum - 1) % 21 > 0
    ? (randomNum - 1) % 21
    : 20;

  setBg();
};

slidePrevElement.addEventListener('click', getSlidePrev);
slideNextElement.addEventListener('click', getSlideNext);

export default setBg;

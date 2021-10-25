import { currentState } from './settings.js';
import { getTimeOfDay } from './greeting.js';
import { getRandomNum } from './utils.js';
import { getImageFromUnsplash, getImageFromFlickr } from './getImages.js';

const bodyElement = document.body;
const slidePrevElement = document.querySelector('.slide-prev');
const slideNextElement = document.querySelector('.slide-next');

let randomNum;
randomNum = getRandomNum(1, 20);

const setBg = async (state) => {
  const { imgSource, imgTag } = state;
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const bgNum = String(randomNum).padStart(2, '0');
  const tag = imgTag || timeOfDay;

  let imgLink;

  switch (imgSource) {
    case 'unsplash':
      imgLink = await getImageFromUnsplash(tag);
      break;
    case 'flickr':
      imgLink = await getImageFromFlickr(tag, randomNum);      
      break;
    default:
      imgLink = `https://raw.githubusercontent.com/Bonamente/momentum-app-images/main/images/${timeOfDay}/${bgNum}.jpg`;
  }

  const img = new Image();  
  img.src = imgLink || `https://raw.githubusercontent.com/Bonamente/momentum-app-images/main/images/${timeOfDay}/${bgNum}.jpg`;

  img.onload = () => {
    bodyElement.style.backgroundImage = `url(${img.src})`;   
  };
};

const getSlideNext = () => {
  randomNum = ((randomNum + 1) % 21) > 0 
    ? (randomNum + 1) % 21
    : 1;
  
  setBg(currentState);
};

const getSlidePrev = () => {
  randomNum = (randomNum - 1) % 21 > 0
    ? (randomNum - 1) % 21
    : 20;

  setBg(currentState);
};

slidePrevElement.addEventListener('click', getSlidePrev);
slideNextElement.addEventListener('click', getSlideNext);

export default setBg;

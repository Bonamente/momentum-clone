import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

const audio = new Audio();
const numberOfTracks = playList.length;

playList.forEach((track) => {
  const liElement = document.createElement('li');
  liElement.classList.add('play-item');
  liElement.textContent = track.title;

  playListElement.append(liElement);
});

let isPlay = false;
let playNum  = 0;

const changeActiveItem = () => {
  const prevActiveItem = document.querySelector('.item-active'); 
  const curActiveItem = document.querySelector(`.play-list li:nth-of-type(${playNum + 1})`);

  if (prevActiveItem) {
    prevActiveItem.classList.remove('item-active');
  }

  curActiveItem.classList.add('item-active');
}

const playAudio = () => {
  audio.src = playList[playNum].src;

  if (!isPlay) {
    isPlay = true;
    audio.currentTime = 0;    
    audio.play();  
  } else {
    isPlay = false;    
    audio.pause();    
  }
};

const toggleBtn = () => {
  playBtn.classList.toggle('pause');

  playAudio();
  changeActiveItem();
};

const playPrev = () => {
  playNum = ((playNum) % numberOfTracks) > 0 
    ? (playNum - 1) % numberOfTracks
    : numberOfTracks - 1;

  changeActiveItem();
  playBtn.classList.add('pause');

  if (isPlay) {
    isPlay = false;
  }

  playAudio(); 
};

const playNext = () => {
  playNum = ((playNum + 1) % numberOfTracks) > 0 
    ? (playNum + 1) % numberOfTracks
    : 0;

  changeActiveItem();
  playBtn.classList.add('pause');

  if (isPlay) {
    isPlay = false;
  }

  playAudio(); 
};

playBtn.addEventListener('click', toggleBtn);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);


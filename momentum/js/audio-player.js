import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const titleElement = document.querySelector('.title');

const progressElement = document.querySelector('#progress');
const progressBar = document.getElementById('progress-bar');

const volumeElement = document.getElementById('volume-input');

const playButton = document.querySelector('.play');
const playIconElement = document.querySelector('#play-icon');
const pauseIconElement = document.querySelector('#pause-icon');

const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');

const muteButton = document.querySelector('.play-mute');
const volumeOn = document.querySelector('#volume-up-icon');
const volumeMute = document.querySelector('#volume-mute-icon');

const audioElement = new Audio();

let trackNum = 0;

const createTrackElement = (index, title, duration) => {
  const trackElement = document.createElement('div');
  trackElement.setAttribute('class', 'track');  
  trackElement.setAttribute('id', `ptc-${index}`);
  trackElement.setAttribute('data-index', index);
  playListElement.appendChild(trackElement);

  const trackPlayButton = document.createElement('button');
  trackPlayButton.setAttribute('class', 'track-play-button');  
  trackPlayButton.setAttribute('id', `pbp-${index}`);
  document.querySelector(`#ptc-${index}`).appendChild(trackPlayButton);

  const buttonImage = document.createElement('i');
  buttonImage.setAttribute('class', 'fas fa-play');
  buttonImage.setAttribute('height', '40');
  buttonImage.setAttribute('width', '40');
  buttonImage.setAttribute('id', `p-img-${index}`);  
  document.querySelector(`#pbp-${index}`).appendChild(buttonImage);

  const trackInfoElement = document.createElement('div');
  trackInfoElement.setAttribute('class', 'playlist-info-track');
  trackInfoElement.textContent = title;  
  document.querySelector(`#ptc-${index}`).appendChild(trackInfoElement);

  const trackDurationElement = document.createElement('div');
  trackDurationElement.setAttribute('class', 'playlist-duration');
  trackDurationElement.textContent = duration; 
  document.querySelector(`#ptc-${index}`).appendChild(trackDurationElement);
}

for (let i = 0; i < playList.length; i += 1) {
  createTrackElement(i, playList[i].title, playList[i].duration);
}

const toggleAudio = () => {
  if (audioElement.paused) {
    playIconElement.classList.remove('visible');
    playIconElement.classList.add('hidden');
    pauseIconElement.classList.remove('hidden');
    pauseIconElement.classList.add('visible');   
    document.querySelector(`#ptc-${trackNum}`).classList.add('active-track');

    playToPause(trackNum);
    audioElement.play();
  } else {
    playIconElement.classList.remove('hidden');
    playIconElement.classList.add('visible');
    pauseIconElement.classList.remove('visible');
    pauseIconElement.classList.add('hidden');
   
    pauseToPlay(trackNum);
    audioElement.pause();
  }
};

const getMinutes = (time) => {
  let min = parseInt(parseInt(time) / 60);
  let sec = parseInt(time % 60);

  if (sec < 10) sec = `0${sec}`;  
  if (min < 10) min = `0${min}`; 
  
  return `${min}:${sec}`; 
};

const seek = (event) => {
  const percent = event.offsetX / progressElement.offsetWidth;
  audioElement.currentTime = percent * audioElement.duration;
  progressBar.style.width = `${percent * 100}%`;
};

const loadNewTrack = (index) => { 
  audioElement.src = playList[index].src;
  titleElement.textContent = playList[index].title;

  audioElement.load();
  toggleAudio();
  updateStylePlaylist(trackNum, index);
  trackNum = index;
};

const getActiveElement = ({ target }) => {
  for (let i = 0; i < playListItems.length; i += 1) {
    if (playListItems[i] === target) {
      const activeIndex = target.getAttribute('data-index');

      if (activeIndex === trackNum) { 
        toggleAudio();
      } else {
        loadNewTrack(activeIndex);
      }
    }
  }
};

const playListItems = document.querySelectorAll('.track');

for (let i = 0; i < playListItems.length; i += 1){
  playListItems[i].addEventListener('click', getActiveElement);
}

audioElement.src = playList[trackNum].src;
titleElement.textContent = playList[trackNum].title;
audioElement.load();

audioElement.addEventListener('loadedmetadata', (e) => {
  document.getElementsByClassName('duration')[0].textContent = getMinutes(audioElement.duration);
});

const timer = document.getElementsByClassName('timer')[0];

const onTimeUpdate = () => {
  const time = audioElement.currentTime;
  timer.textContent = getMinutes(time);
  setProgressBar();

  if (audioElement.ended) {
    playIconElement.classList.remove('hidden');
    playIconElement.classList.add('visible');
    pauseIconElement.classList.remove('visible');
    pauseIconElement.classList.add('hidden');

    pauseToPlay(trackNum);

    if (trackNum < playList.length - 1) {
      const index = parseInt(trackNum) + 1;
      loadNewTrack(index);
    } else {
      trackNum = 0;
      loadNewTrack(trackNum);
    }
  }
};

const setProgressBar = () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  progressBar.style.width = `${progress}%`;
};

const numberOfTracks = playListItems.length;

const getPrevTrack = () => {
  const oldIndex = trackNum;

  trackNum = ((trackNum) % numberOfTracks) > 0 
    ? (trackNum - 1) % numberOfTracks
    : numberOfTracks - 1;

  updateStylePlaylist(oldIndex, trackNum);
  loadNewTrack(trackNum);
};

const getNextTrack = () => {
  const oldIndex = trackNum;

  trackNum = ((trackNum + 1) % numberOfTracks) > 0 
    ? (trackNum + 1) % numberOfTracks
    : 0;

  updateStylePlaylist(oldIndex, trackNum);
  loadNewTrack(trackNum);
};

const updateStylePlaylist = (oldIndex, newIndex) => {
  document.querySelector(`#ptc-${oldIndex}`).classList.remove('active-track');
  pauseToPlay(oldIndex);

  document.querySelector(`#ptc-${newIndex}`).classList.add('active-track');
  playToPause(newIndex);
};

const playToPause = (index) => {
  const element = document.querySelector(`#p-img-${index}`);
  element.classList.remove('fa-play');
  element.classList.add('fa-pause');
};

const pauseToPlay = (index) => {
  const element = document.querySelector(`#p-img-${index}`);
  element.classList.remove('fa-pause');
  element.classList.add('fa-play');
};

const toggleMute = () => {
  if (audioElement.muted === false) {
     audioElement.muted = true;
     volumeOn.classList.remove('visible');
     volumeOn.classList.add('hidden');
     volumeMute.classList.remove('hidden');
     volumeMute.classList.add('visible');
     
     volumeElement.setAttribute('data-volume', volumeElement.value);
     volumeElement.value = 0;
  } else {
    audioElement.muted = false; 
    volumeMute.classList.remove('visible');
    volumeMute.classList.add('hidden');
    volumeOn.classList.remove('hidden');
    volumeOn.classList.add('visible');

    volumeElement.value = volumeElement.dataset.volume;
  }
};

audioElement.addEventListener('timeupdate', onTimeUpdate);
progressElement.addEventListener('click', seek);
playButton.addEventListener('click', toggleAudio);
playPrevButton.addEventListener('click', getPrevTrack);
playNextButton.addEventListener('click', getNextTrack);
muteButton.addEventListener('click', toggleMute);
volumeElement.addEventListener('input', () => {
	audioElement.volume = volumeElement.value;	
});

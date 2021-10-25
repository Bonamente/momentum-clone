import { getRandomNum } from './utils.js';

export const getImageFromUnsplash = async (tag) => {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=iXyLXSbjkgg2UVV3_O8vk0vJvFtyycAmGBEjpd13gaw`;

  const res = await fetch(url);
  const data = await res.json();
  const imgLink = data.urls.raw + '&w=1920&q=80&fit=max';

  return imgLink;  
};

const partsOfDay = ['night', 'morning', 'afternoon', 'evening'];
let flickrCurUrl;
let flickrCollectionByTag;

export const getImageFromFlickr = async (tag, num) => {
  let imgLink;

  if (partsOfDay.includes(tag)) {
    const res = await fetch('js/flickrData.json');
    const data = await res.json();
    const lastIndex = data[tag].length - 1;
    const imgNum = getRandomNum(0, lastIndex);
    const path = data[tag][imgNum];
    
    imgLink = `https://live.staticflickr.com/${path.server}/${path.id}_${path.secret}_k.jpg`;

    return imgLink;  
  }

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19fb1fc242da32f311b059656267f2d8&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;

  if (flickrCurUrl !== url) {
    const res = await fetch(url);
    const data = await res.json();

    flickrCurUrl = url;    
    flickrCollectionByTag = data.photos;
    imgLink = flickrCollectionByTag.photo[num].url_l;    

    return imgLink; 
  }

  imgLink = flickrCollectionByTag.photo[num].url_l;

  return imgLink;
};

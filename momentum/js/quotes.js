import { getRandomNum } from './utils.js';
import { currentState } from './settings.js';

const changeQuoteBtn = document.querySelector('.change-quote');
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

const getQuote = async (state) => {
  const { lang } = state;  
  const quotes = 'js/data.json';
  const res = await fetch(quotes, {mode: 'no-cors'});
  const data = await res.json();

  const quoteNumber = getRandomNum(1, quotes.length); 
  const [ quote ] = data.filter((quote) => quote.id === quoteNumber);

  quoteElement.setAttribute('data-quote', quote.id);
  
  if (lang === 'en') {
    quoteElement.textContent = `"${quote.textEn}"`;
    authorElement.textContent = `${quote.authorEn}`; 
  } else {
    quoteElement.textContent = `"${quote.textRu}"`;
    authorElement.textContent = `${quote.authorRu}`;  
  }  
};

changeQuoteBtn.addEventListener('click', () => getQuote(currentState));

export default getQuote;

import quotes from './data.js';
import { getRandomNum } from './utils.js';

const changeQuoteBtn = document.querySelector('.change-quote');
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

const getQuote = () => {
 const quoteNumber = getRandomNum(1, quotes.length); 
 const [ quote ] = quotes.filter((quote) => quote.id === quoteNumber); 

 quoteElement.textContent = `"${quote.textEn}"`;
 authorElement.textContent = `${quote.authorEn}`;
};

changeQuoteBtn.addEventListener('click', getQuote);

export default getQuote;

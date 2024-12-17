const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  showLoadingSpinner();

  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check is author is blank and replace it with Unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author.trim();
  }

  quoteText.textContent = quote.text.trim();

  removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();

  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();

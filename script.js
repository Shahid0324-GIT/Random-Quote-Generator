// https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader

function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Show new quote

function newQuote() {
  loading();
  // Pick a random quote from API quotes array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   console.log(quote);
  // Check if author is blacnk/null and replace it with 'Unknown";
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
  // Check quote length to detrmibe styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const proxyUrl = "https://cors-anwhere.herokuapp.com/";
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[9]);
    newQuote();
  } catch (error) {
    //Catching error
    console.log(error);
  }
}

// Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", newQuote);

twitterBtn.addEventListener("click", tweetQuote);

// On Load the quotes need to be logged on console

getQuotes();

// Local Storage Quotes

// function newQuote() {
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }

// newQuote();

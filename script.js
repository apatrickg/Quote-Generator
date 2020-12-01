const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    showLoadingSpinner();
    // Pick random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author field is blank and replace w/ 'unknown'
    if (!quote.author){
        authorText.textContent = 'Unkown';
    } else{
        authorText.textContent = quote.author;
    }
    // check quote length
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote and Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        console.log('whoops, no quote', error);
    }
}

// Tweet 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // Open in a new tab 
    window.open(twitterUrl, '_blank'); 
}

// event listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote()
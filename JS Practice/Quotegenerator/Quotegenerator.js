const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle Onassis",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The mind is everything. What you think you become. - Buddha",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt"
];

const quoteDisplay = document.querySelector('#quote-display');
const newQuoteBtn = document.querySelector('#new-quote-btn');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayNewQuote() {
    quoteDisplay.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteElement = document.createElement('p');
    quoteElement.textContent = randomQuote;
    quoteElement.style.color = getRandomColor();
    quoteDisplay.appendChild(quoteElement);
}

newQuoteBtn.addEventListener('click', displayNewQuote);
displayNewQuote();

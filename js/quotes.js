const quotes = [
  { quote: "Success is the child of audacity.", author: "Benjamin Disraeli" },
  {
    quote: "True Knowledge exists in knowing that you know nothing.",
    author: "Socrates",
  },
  {
    quote: "The secret of happiness is renunciation.",
    author: "Andrew Camegie",
  },
  {
    quote:
      "Life is like riding bicycle. To keep your balance you must keep moving.",
    author: "Albert Einstein",
  },
  {
    quote: "Never underestimate your own ignorance.",
    author: "Albert Einstein",
  },
  {
    quote: "You never know what life is like, until you have lived it.",
    author: "Manlyn Monroe",
  },
  {
    quote: "To marry is to halve your rights and double your duties. ",
    author: "Arthur Schopenhaur",
  },
  {
    quote: "He makes no friend who never made a foe.",
    author: "Alfred, Lord Tennyson",
  },
  {
    quote: "Nothing is more despicable than respect based on fear.",
    author: "Albert Camus",
  },
  {
    quote: "what is essential is invisible to the eye.",
    author: "Antoine de Saint-Exupery",
  },
  {
    quote: "Business? It's quite simple. It's other people's money.",
    author: "Alexandre Dumas",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

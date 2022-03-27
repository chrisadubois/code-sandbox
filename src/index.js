import "./styles.css";

// global
const container = document.querySelector(".container");
const timer = 1000;
const cardCount = 2;

const initializeCards = (numCards) => {
  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.className = "card";
    const header = document.createElement("h1");
    header.innerText = "Lorem ipsum dolor sit amet";
    const body = document.createElement("p");
    body.innerText = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque eos, atque sed saepe
    tempore, sequi qui excepturi voluptate ut perspiciatis culpa sit harum, corrupti ullam 
    voluptatibus obcaecati sint dignissimos quas.`;
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  }
};

const loadNewData = () => {
  setTimeout(() => {
    initializeCards(cardCount);
  }, timer);
};

// 2 methods of approach
// 1. calculate
// 2. intersection observer

// 1. https://dev.to/tingchun0113/how-to-implement-infinite-scroll-with-vanilla-js-3791
// window.addEventListener("scroll", async () => {
//   // Scrolled to bottom
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     loadNewData();
//   }
// });

// 2. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const target = document.getElementById("loading");
const handleIntersectionEntriesObserver = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadNewData();
    }
  });
};
(() => {
  const options = {
    // Use the whole screen as scroll area
    root: null,
    // Do not grow or shrink the root area
    rootMargin: "0px",
    // Threshold of .25 will fire callback when 100% of element is visible
    threshold: 0.25
  };

  const observer = new IntersectionObserver(
    handleIntersectionEntriesObserver,
    options
  );

  observer.observe(target);
})();

if (document.readyState !== "loading") {
  initializeCards(5);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCards(5);
  });
}

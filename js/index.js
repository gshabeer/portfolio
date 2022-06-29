let menuBar = document.querySelector("header nav ul");
let menuBtn = document.querySelector(".menu-bar");
let footDate = document.getElementById("fdate");

let currYear = new Date();

footDate.innerText = currYear.getFullYear();

menuBtn.addEventListener("click", () => {
  menuBar.classList.toggle("active");
});

// Typing Text

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  // Type Method
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 50;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = [
    "Welcome To My Website!",
    "I`m a WebSite Developer.",
    "Websites With HTML CSS & JS."
  ];
  const wait = txtElement.getAttribute("data-wait");

  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

window.addEventListener("scroll", () => menuBar.classList.remove("active"));

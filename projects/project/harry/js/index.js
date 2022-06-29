// navBar Function 
let burger = document.querySelector('.burger');


burger.onclick = () => {
    let usedLi = document.querySelectorAll('ul li');
    usedLi.forEach((currLi) => {
        currLi.classList.toggle('active');
    });
    document.getElementsByTagName('nav')[0].classList.toggle('active');
    document.querySelector('.right').classList.toggle('active');
};

// Login Function
loginBtn = document.querySelector('.login-btn');
loginForm = document.querySelector('.sec3');
closeBtn = document.querySelector('.btn-5');
closeBtn2 = document.querySelector('.lines');



loginBtn.addEventListener('click', () => {
    loginForm.classList.toggle('sec3-show');
});

closeBtn.addEventListener('click', () => {
    loginForm.classList.remove('sec3-show');
});

closeBtn2.addEventListener('click', () => {
    loginForm.classList.remove('sec3-show');
});




// SignUp Function

signupBtn = document.querySelector('.signup-btn');
loginForm2 = document.querySelector('.sec4');
closeBtn3 = document.querySelector('.btn-51');
closeBtn4 = document.querySelector('.lines2');
footerSec = document.querySelector('.footer2');
backGround = document.querySelector('.bg3');



signupBtn.addEventListener('click', () => {
    loginForm2.classList.toggle('sec4-show');
    footerSec.classList.toggle('footer3');
    backGround.classList.toggle('bg4');
});

closeBtn3.addEventListener('click', () => {
    loginForm2.classList.remove('sec4-show');
    footerSec.classList.remove('footer3');

});

closeBtn4.addEventListener('click', () => {
    loginForm2.classList.remove('sec4-show');
    footerSec.classList.remove('footer3');
});







// Typing Text Effect
class typeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
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
            // Remove charecter
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add charecter
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Init Type Speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is compelete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make Pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }


        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new typeWriter(txtElement, words, wait);
}
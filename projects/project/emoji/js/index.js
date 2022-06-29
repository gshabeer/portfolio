let color = document.querySelector(".color");
let eyes = document.querySelector(".eyes");
let mouth = document.querySelector(".mouth");

let prevBtn = document.getElementById("prev_btn");
let wrapper = document.querySelector(".left");
let allSec = document.querySelectorAll(".emoji");
let allEmoji = document.querySelectorAll(".emojiClick");
let allColors = document.querySelectorAll(".clr");

let compImoji = document.querySelector(".compImoji");
let compImojiEyes = document.querySelector(".compEyes");
let compImojiMouth = document.querySelector(".compMouth");

allColors.forEach((currColor) => {
  currColor.addEventListener("click", function () {
    // if it is at starting dont show previous button else show previous button
    prevBtn.parentElement.classList.remove("hide");

    compImoji.className = `compImoji ${this.className}`;

    // after selecting Scroll to Next
    color.classList.add("hide");
    eyes.classList.remove("hide");
    mouth.classList.add("hide");
  });
});

prevBtn.addEventListener("click", () => {
  if (!eyes.classList.contains("hide")) {
    color.classList.remove("hide");
    eyes.classList.add("hide");
    mouth.classList.add("hide");
  } else if (!mouth.classList.contains("hide")) {
    color.classList.add("hide");
    eyes.classList.remove("hide");
    mouth.classList.add("hide");
  } else {
    prevBtn.parentElement.classList.add("hide");
  }
});

allEmoji.forEach((currEmoji) => {
  currEmoji.addEventListener("click", function () {
    // if it have basic body then add eyes and mouth else go to choose color section
    if (compImoji.classList.contains("clr")) {
      // if they are eyes then to eye container else to mouth container
      if (this.classList.contains("eyes")) {
        compImojiEyes.innerHTML = `<img src="${this.dataset.src}" alt="Loading" class="eyes emojiClick"/>`;

        // after selecting Scroll to Next
        color.classList.add("hide");
        eyes.classList.add("hide");
        mouth.classList.remove("hide");
      } else {
        compImojiMouth.innerHTML = `<img src="${this.dataset.src}" alt="Loading" class="emojiClick" />`;

        // after selecting Scroll to Next
        color.classList.add("hide");
        eyes.classList.add("hide");
        mouth.classList.remove("hide");
      }

      // if it have basic body then add eyes and mouth else go to choose color section
    } else {
      color.classList.remove("hide");
      eyes.classList.add("hide");
      mouth.classList.add("hide");
    }
  });
});

window.onload = () => {
  // degree slider
  let value = document.querySelector(".value2");
  let handel = document.querySelector(".handle2");
  let is_mouse_down = false;
  let deg;

  const valChange = () => {
    if (is_mouse_down == true) {
      let val = value.innerText;
      deg = Number(val.slice(0, val.length - 3));
    }
  };

  // Remaining Body
  let colorOne = document.getElementById("color-a");
  let colorTwo = document.getElementById("color-b");
  let outputCode = document.getElementById("code");
  let bgColor = document.getElementById("bg");
  let generateBtn = document.getElementById("generate");
  let copyBtn = document.getElementById("copy");

  // setting background
  function bgset() {
    let val = value.innerText;
    deg = Number(val.slice(0, val.length - 3));

    bgColor.style.backgroundImage = `linear-gradient(${deg}deg, ${colorOne.value}, ${colorTwo.value})`;
    outputCode.textContent = `linear-gradient(${deg}deg, ${colorOne.value}, ${colorTwo.value});`;
  }

  // copy code when clicking on copy button
  const copyCode = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = outputCode.textContent;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1000);
  };

  // setting default color on reload or open
  let val = value.innerText;
  deg = Number(val.slice(0, val.length - 3));

  colorOne.value = "#1488cc";
  colorTwo.value = "#2b32b2";
  bgColor.style.backgroundImage = `linear-gradient(${deg}deg, #1488cc, #2b32b2)`;
  outputCode.textContent = `linear-gradient(${deg}deg, #1488cc, #2b32b2);`;

  // Events
  document.addEventListener("mousemove", () => valChange());
  handel.addEventListener("mousemove", () => valChange());
  handel.addEventListener("mousedown", () => (is_mouse_down = true));
  generateBtn.addEventListener("click", () => bgset());
  copyBtn.addEventListener("click", () => copyCode());
};

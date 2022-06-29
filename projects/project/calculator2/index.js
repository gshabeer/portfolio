let numbers = document.querySelectorAll("[data-number]");
let operations = document.querySelectorAll("[data-operation]");
let percentBtn = document.querySelector("[data-percent]");
let clearAll = document.querySelector("[data-clear]");
let deleteBtn = document.querySelector("[data-delete]");
let changeSign = document.querySelector("[data-sign]");
let dot = document.querySelector("[data-dot]");
let equal = document.querySelector("[data-equal]");

// Scientific Calculator
let scientficToggle = document.querySelector(".toggle");
let scientficMenu = document.querySelector(".scientific");

let sqrBtn = document.querySelector("[data-sqr]");
let sqrtBtn = document.querySelector("[data-sqrt]");
let logBtn = document.querySelector("[data-log]");
let sineBtn = document.querySelector("[data-sine]");
let cosBtn = document.querySelector("[data-cos]");
let tanBtn = document.querySelector("[data-tan]");
let sineInverseBtn = document.querySelector("[data-asine]");
let cosInverseBtn = document.querySelector("[data-acos]");
let tanInverseBtn = document.querySelector("[data-atan]");

let inputBox = document.getElementById("input-box");

let dotFlag = new Set();

let patternForOperators = /[+\-*\/]/g;
let patternForNumbers = /[0-9]/g;

// When Press Numbers
function numberFunc(number) {
  let exp = inputBox.innerText;
  let last = exp.substring(exp.length - 1, exp.length);
  let first = exp.substring(0, 1);
  if (first == 0 && last == 0 && last !== "." && !exp.includes(".")) {
    inputBox.innerText = "";
  }
  inputBox.innerText += number;
}

// When press operations
function operationFunc(opration) {
  let exp = inputBox.innerText;
  let last = exp.substring(exp.length - 1, exp.length);
  if (inputBox.innerText !== "") {
    if (last.match(patternForOperators)) {
      let newExp = exp.slice(0, -1);
      newExp += opration;
      inputBox.innerText = newExp;
    } else {
      equalFunc();
      inputBox.innerText += opration;
    }
  }

  dotFlag.clear();
}

// when press backspace or backarrow
function deleteFunc() {
  if (inputBox.innerText != "0") {
    let exp = inputBox.innerText;
    let newExp = exp.slice(0, -1);
    inputBox.innerText = newExp;
  }

  if (inputBox.innerText == "") {
    inputBox.innerText = "0";
  }

  let exp = String(inputBox.innerText);
  if (exp.includes(".")) {
    dotFlag.add(".");
  } else {
    dotFlag.clear();
  }
}

// add point
function addDot() {
  let exp = String(inputBox.innerText);
  let first = exp.substring(0, 1);
  let last = exp.substring(exp.length - 1, exp.length);
  let EvalExp = eval(inputBox.innerText);
  if (
    inputBox.innerText !== "" &&
    last !== "." &&
    !last.match(patternForOperators) &&
    dotFlag.size <= 0
  ) {
    if (last == 0 && first == 0 && EvalExp == 0) {
      inputBox.innerText = `0` + this.dataset.dot;
    } else {
      inputBox.innerText += this.dataset.dot;
    }
  } else if (inputBox.innerText == "") {
    inputBox.innerText = `0` + this.dataset.dot;
  }

  dotFlag.add(".");
}

// Solve all equation
function equalFunc() {
  try {
    if (inputBox.innerText !== "") {
      inputBox.innerText = eval(inputBox.innerText);
    }
  } catch (error) {
    alert("Please Enter Correct Values...");
  }

  let exp = String(inputBox.innerText);
  if (exp.includes(".")) {
    dotFlag.add(".");
  } else {
    dotFlag.clear();
  }
}

// Numbers
Array.from(numbers).forEach((num) => {
  num.addEventListener("click", () => numberFunc(num.dataset.number));
});

// Operations
Array.from(operations).forEach((operate) => {
  operate.addEventListener("click", () =>
    operationFunc(operate.dataset.operation)
  );
});

// Percent button
percentBtn.addEventListener("click", function () {
  equalFunc();
  let exp = inputBox.innerText;
  if (!isNaN(exp)) {
    inputBox.innerText = exp / 100;
  } else {
    alert("Please Correct It First...");
  }
});

// Clear All button
clearAll.addEventListener("click", () => {
  if (inputBox.innerText != 0) {
    inputBox.classList.add("active");
    dotFlag.clear();

    setTimeout(() => {
      inputBox.innerText = "0";
      inputBox.classList.remove("active");
    }, 400);
  }
});

// Delete button
deleteBtn.addEventListener("click", deleteFunc);

// Change Sign to postive or nagtive
changeSign.addEventListener("click", function () {
  if (
    !inputBox.innerText.match(patternForOperators) ||
    inputBox.innerText < 0
  ) {
    inputBox.innerText *= -1;
  } else {
    alert("Please Correct It First...");
  }
});

// point button
dot.addEventListener("click", addDot);

// equal button
equal.addEventListener("click", equalFunc);

// Scientific menu toggler
scientficToggle.addEventListener("click", () => {
  scientficMenu.classList.toggle("active");
});

// Square Button
sqrBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = exp ** 2;
});

// square Root button
sqrtBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.sqrt(exp);
});

// log button
logBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.log(exp);
});

// sine button
sineBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.sin(exp);
});

// cos button
cosBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.cos(exp);
});

// tan button
tanBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.tan(exp);
});

// sine inverse button
sineInverseBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.asin(exp);
});

// cos inverse button
cosInverseBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.acos(exp);
});

// tan inverse button
tanInverseBtn.addEventListener("click", () => {
  equalFunc();
  let exp = inputBox.innerText;
  inputBox.innerText = Math.atan(exp);
});

// When press keys on keyboard
document.onkeydown = function (evnt) {
  let key = String(parseInt(evnt.key));

  // press buttons
  if (!isNaN(key)) {
    if (evnt.key.match(patternForNumbers)) {
      numberFunc(evnt.key);
    }
  }

  // press operations
  if (evnt.key.match(patternForOperators)) {
    operationFunc(evnt.key);
  }

  // press point
  if (evnt.key === ".") {
    addDot();
  }

  // press enter or equal
  if (evnt.key === "Enter" || evnt.key === "=") {
    equalFunc();
  }

  // press backspace to delete one number
  if (evnt.key === "Backspace") {
    deleteFunc();
  }

  // press delete button to clear all
  if (evnt.key === "Delete") {
    inputBox.innerText = "0";
  }
};

const inputRange = document.querySelector('.number-color input');
const number = document.querySelector('.number-color p span');
const generateBtn = document.querySelector('.generate');
const code = document.querySelector('.code input');
const copyBtn = document.querySelector('.code .copy');
const body = document.body;

number.innerHTML = inputRange.value;
let color = `linear-gradient(${generateDegree()}, `
for (let i = 0; i < inputRange.value; i++) {
    color += generateColor();
    if (i === inputRange.value - 1) {
        color += ')';
    } else {
        color += ', ';
    }
}
body.style.background = color;
code.value = color;


copyBtn.addEventListener('click', function () {
    this.innerHTML = 'Copied';
    code.select();
    document.execCommand("copy");
});





inputRange.addEventListener('input', function () {
    number.innerHTML = this.value;
})



generateBtn.addEventListener('click', function () {
    let color = `linear-gradient(${generateDegree()}, `
    for (let i = 0; i < inputRange.value; i++) {
        color += generateColor();
        if (i === inputRange.value - 1) {
            color += ')';
        } else {
            color += ', ';
        }
    }
    body.style.background = color;
    code.value = color += ';';
    copyBtn.innerHTML = 'Copy';
});

function generateColor() {
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);
    return `rgb(${red}, ${green}, ${blue})`;
}

function generateDegree() {
    const degree = Math.floor(Math.random() * 360 + 1);
    return `${degree}deg`;
}
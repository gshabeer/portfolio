class Calculator {
    constructor(prevOperandTxt, currOperandTxt) {
        this.prevOperandTxt = prevOperandTxt;
        this.currOperandTxt = currOperandTxt;
        this.clear();
    }

    // Clear All
    clear() {
        this.currOperand = '0';
        this.prevOperand = '';
        this.operation = undefined;
    }

    // Delete One
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    // Point
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString();
    }


    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return

        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intDisplay;
        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        this.currOperandTxt.innerText = this.getDisplayNumber(this.currOperand);
        if (this.operation != null) {
            this.prevOperandTxt.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTxt.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTxt = document.querySelector('[data-perv-oper]');
const currOperandTxt = document.querySelector('[data-curr-oper]');

const calculator = new Calculator(prevOperandTxt, currOperandTxt);

numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerHTML);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

document.addEventListener('keydown', function (evnt) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;

    if (evnt.key.match(patternForNumbers)) {
        evnt.preventDefault();
        calculator.appendNumber(evnt.key);
        calculator.updateDisplay();
    }

    if (evnt.key === '.') {
        evnt.preventDefault();
        calculator.appendNumber(evnt.key);
        calculator.updateDisplay();
    }

    if (evnt.key.match(patternForOperators)) {
        evnt.preventDefault();
        calculator.chooseOperation(evnt.key)
        calculator.updateDisplay();
    }

    if (evnt.key === 'Enter' || evnt.key === '=') {
        evnt.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }

    if (evnt.key === 'Backspace') {
        evnt.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }

    if (evnt.key === 'Delete') {
        evnt.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }

});

let screen = document.querySelector('.screen');
let operator;
let number1;
let number2;

function addToScreen(value) {
    screen.value += value;

}

function addDotToScreen() {
    currentInput = screen.value
    screen.value = currentInput + '.';
}

function setOperator(op) {
    if (operator) {
        calculate()
        operator = op;
        number1 = screen.value;
        screen.value = '';
    }
    else {
        operator = op;
        number1 = screen.value;
        screen.value = '';
    }

}




function calculate() {
    num1 = Number(number1)
    number2 = screen.value
    num2 = Number(number2)

    if (operator === '+') {
        const sum = num1 + num2
        screen.value = sum;
        operator = '';
    }
    if (operator === '-') {
        const substract = num1 - num2
        screen.value = substract;
        operator = '';
    }
    if (operator === '*') {
        const multiply = num1 * num2
        screen.value = multiply;
        operator = '';
    }
    if (operator === '/') {
        const divide = num1 / num2
        screen.value = divide;
        operator = '';
    }
}

function clearScreen() {
    screen.value = '';
    number1 = '';
    number2 = 0;
    operator = '';
}
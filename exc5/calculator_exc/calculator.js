
let screen = document.querySelector('.screen');
let operator;
let screenVal1;
let screenVal2;


function addToScreen(value) {
  screen.value += value;
  console.log(screen.value);
}

function addDotToScreen() {
    currentInput = screen.value
    screen.value = currentInput + '.';
}
    
function setOperator(op) {
    operator = op;
    screenVal1 = screen.value;
    screen.value = '';
    console.log(operator);
}



function calculate() {
    num1 = Number(screenVal1)
    screenVal2 = screen.value
    num2 = Number(screenVal2)
    
    let result = '';
    if (operator === '+') {
        const sum = num1 + num2
        screen.value = sum;
    }
    if (operator === '-') {
        const substract = num1 - num2
        screen.value = substract;
    }
    if (operator === '*') {
        const multiply = num1 * num2
        screen.value = multiply;
    }
    if (operator === '/') {
        const divide = num1 / num2
        screen.value = divide;
    }
}

function clearScreen() {
  screen.value = '';
}
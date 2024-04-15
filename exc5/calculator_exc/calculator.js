
let screen = document.querySelector('.screen');
let operator;
let number1;
let number2;
screen.value = 0


function addToScreen(value) {
  screen.value += value;

}

function addDotToScreen() {
    currentInput = screen.value
    screen.value = currentInput + '.';
}
    
function setOperator(op) {
    if (operator){
        calculate()
        operator = op;
        number1 = screen.value;
        screen.value = '';
    }
    else{
        operator = op;
        number1 = screen.value;
        screen.value = '';
    }
}




function calculate() {
    num1 = Number(number1)
    number2 = screen.value
    num2 = Number(number2)
    
    let result;
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
  number1 = '';
  number2 = 0;
  operator = '';
}
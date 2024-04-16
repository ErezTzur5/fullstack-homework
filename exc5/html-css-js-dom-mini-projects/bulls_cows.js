
let computerNumber = generateComputerNumber();
let won = document.querySelector('.won');
let playerGuess;

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
    // generates number form 0-9
}

function generateComputerNumber() {
    let number = [];
    for (let i = 0; number.length < 4; i++) {
        randomNumberHolder = generateRandomNumber();
        if (!number.includes(randomNumberHolder))
            number.push(randomNumberHolder);

    }
    console.log(number);
    return number; // creating array with 4 random numbers
}

function checkGuess(computerNumber, playerGuess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
        if (playerGuess[i] === computerNumber[i]) {
            bulls++;
        } else if (computerNumber.includes(playerGuess[i])) {
            cows++;
        }
    }

    return { bulls, cows }; // checking for bulls or cows
}

function incrementValue(btnId) {
    let button = document.getElementById(btnId);
    let value = parseInt(button.innerText);
    if (value != 9) {
        button.innerText = value + 1;
    }
    else if (value == 9) {
        button.innerText = 0
    }

}

function sendArray() {
    playerGuess = [];
    for (let index = 0; playerGuess.length < 4; index++) {
        let buttons = document.getElementById(`btn${index}`)
        
        let value = parseInt(buttons.innerText);

        if (!playerGuess.includes(value)){
            playerGuess.push(value)
        }
        else{won.innerText = "Duplicate!"}
    }    

    console.log('playerGuess:',playerGuess);
    let result = checkGuess(computerNumber, playerGuess);
    console.log(`Bulls: ${result.bulls}, Cows: ${result.cows}`);
    if (result.bulls === 4){
        won.innerText = "You WON!"
    }

}


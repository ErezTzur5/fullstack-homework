let computerNumber = generateComputerNumber();
let playerGuess = [];

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
    // generates number form 0-9
}

function generateComputerNumber() {
    let number = [];
    for (let i = 0; i < 4; i++) {
        number.push(generateRandomNumber());
    }
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

let result = checkGuess(computerNumber, playerGuess);
console.log(`Bulls: ${result.bulls}, Cows: ${result.cows}`);

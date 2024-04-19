
let computerNumber = generateComputerNumber();
let won = document.querySelector('.won');
const wonNumbers = document.querySelector('span.number');
let playerGuess;
let guessCount = 0;
let result;
let player_name;


function getName() {
    player_name = document.getElementById("nameInput").value;
    if (player_name.trim() !== "") {
        document.querySelector(".container").style.display = "block";
        document.querySelector(".nameHolder").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
}

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
    if (bulls === 4) {
        won.innerText = (`${player_name} Won!`)
        wonNumbers.textContent = computerNumber.join(' ')

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
    won.innerText = ""
    guessCount++;
    for (let index = 0; playerGuess.length < 4; index++) {
        let buttons = document.getElementById(`btn${index}`)

        let value = parseInt(buttons.innerText);

        if (!playerGuess.includes(value)) {
            playerGuess.push(value)



        }
        else { won.innerText = "Duplicate!" }

    }

    result = checkGuess(computerNumber, playerGuess);
    console.log('Player Guess: ', playerGuess);
    console.log('Player Guess count: ', guessCount);
    addGuessRow(playerGuess)
}

function addGuessRow(guess) {
    const container = document.querySelector('.result-row');
    const newRow = document.createElement('div');
    newRow.classList.add('row');

    const newNumber = document.createElement('span');
    newNumber.classList.add('number');
    newNumber.textContent = `${guess.join(' ')}`;
    newNumber.style.marginLeft = '0px';
    newRow.appendChild(newNumber);

    const newDiv = document.createElement('div');
    newRow.appendChild(newDiv)

    const newBull = document.createElement('span');
    newBull.classList.add('bull');
    newBull.textContent = `${result.bulls}`;
    newBull.style.marginRight = '0px'

    newDiv.appendChild(newBull);

    const newCow = document.createElement('span');
    newCow.classList.add('cow');
    newCow.textContent = `${result.cows}`;
    newCow.style.marginRight = '90px';


    newDiv.appendChild(newCow);

    container.appendChild(newRow);
}

function newGame() {
    computerNumber = generateComputerNumber();
    guessCount = 0;
    result = null;
    playerGuess = null;
    won.innerText = "";
    clearGuessRows();
}

function clearGuessRows() {
    const container = document.querySelector('.result-row');
    container.innerHTML = '';
}


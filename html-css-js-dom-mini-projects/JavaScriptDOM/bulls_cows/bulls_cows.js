
let computerNumber = generateComputerNumber();
let won = document.querySelector('.won');
const wonNumbers = document.querySelector('span.number');
let playerGuess;
let guessCount = 0;
let bulls = 0;
let result;
let player_name;
let scoreVisible = false;
let startTime = 0;
let endTime = 0;
let durationInSeconds = 0;
let timerInterval;

function startTimer() {
    startTime = performance.now();
    timerInterval = setInterval(updateTimerDisplay, 1000); // Update every second
}

function stopTimer() {
    clearInterval(timerInterval); // Stop the interval
}

function updateTimerDisplay() {
    const currentTime = performance.now();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    displayTimer(elapsedSeconds);
}

function displayTimer(durationInSeconds) {
    document.getElementById("durationDisplay").textContent = `Time: ${durationInSeconds}`;
}



function toggleScoreTable() {
    const scoreTable = document.getElementById('scoreTable');
    scoreVisible = !scoreVisible; // toggle visibility

    if (scoreVisible && bulls === 4) {
        scoreTable.style.display = "block";
        updateScoreTable(player_name, guessCount, playerGuess);
    } else {
        scoreTable.style.display = "none";
    }
}

function updateScoreTable() {
    const scoreBody = document.getElementById('scoreBody');
    scoreBody.innerHTML = ""; // clear existing rows

    const capitalizedPlayerName = player_name.charAt(0).toUpperCase() + player_name.slice(1);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${capitalizedPlayerName}</td><td>${guessCount}</td><td>${playerGuess.join(' ')}</td><td>${durationInSeconds}</td>`;
    scoreBody.appendChild(newRow);
}

function getName() {
    player_name = document.getElementById("nameInput").value;
    if (player_name.trim() !== "") {
        document.querySelector(".container").style.display = "block";
        document.querySelector(".nameHolder").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
    // startTime = performance.now();
    startTimer();

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

function formatSeconds(seconds) {
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes ${remainingSeconds.toFixed(1)} seconds`;
    } else {
        return `${seconds.toFixed(1)} seconds`;
    }

}

function checkGuess(computerNumber, playerGuess) {
    bulls = 0;
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
        // endTime = performance.now();
        // duration = (endTime - startTime) / 1000;
        // durationInSeconds = formatSeconds(duration)
        stopTimer();
        console.log(`Round duration: ${durationInSeconds} seconds`);

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
    newNumber.style.cssText = 'padding-right: 1rem;';
    newRow.appendChild(newNumber);

    const newDiv = document.createElement('div');
    newRow.appendChild(newDiv)

    const newBull = document.createElement('span');
    newBull.classList.add('bull');
    newBull.textContent = `${result.bulls}`;
    newBull.style.cssText = 'padding-right: 5.5rem;';

    newDiv.appendChild(newBull);

    const newCow = document.createElement('span');
    newCow.classList.add('cow');
    newCow.textContent = `${result.cows}`;
    newCow.style.cssText = 'padding-right: 1.5rem;';


    newDiv.appendChild(newCow);

    container.appendChild(newRow);
}

function newGame() {
    // Reset player name and display state
    player_name = "";
    document.querySelector(".container").style.display = "none";
    document.querySelector(".nameHolder").style.display = "block";
    durationInSeconds = 0;


    // Reset game state
    computerNumber = generateComputerNumber();
    guessCount = 0;
    result = null;
    playerGuess = null;
    won.innerText = "";
    wonNumbers.textContent = '? ? ? ?'
    clearGuessRows();

}

function clearGuessRows() {
    const container = document.querySelector('.result-row');
    container.innerHTML = '';
}


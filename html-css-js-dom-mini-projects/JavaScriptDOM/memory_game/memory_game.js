let player_name;
let grid;
let startTime = 0;
let endTime = 0;
let durationInSeconds = 0;
let timerInterval;
let guessCount = 0;
let duplicatedCardsArray = 0;
let winner = false;
let won = document.querySelector('.won');

const cards = [
    '🐶', '🐶',
    '🐱', '🐱',
    '🐭', '🐭',
    '🐹', '🐹',
    '🦊', '🦊',
    '🐻', '🐻'
];

function startTimer() {
    startTime = performance.now();
    timerInterval = setInterval(updateTimerDisplay, 1000); // update every second
}

function stopTimer() {
    clearInterval(timerInterval); // stop the interval
}

function updateTimerDisplay() {
    const currentTime = performance.now();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    displayTimer(elapsedSeconds);
}

function displayTimer(durationInSeconds) {
    document.getElementById("durationDisplay").textContent = `Time: ${durationInSeconds}`;
}




function getName() {
    player_name = document.getElementById("nameInput").value;
    // get player name and shows the game ui
    if (player_name.trim() !== "") {
        document.querySelector(".grid-size").style.display = "flex";
        document.querySelector(".nameHolder").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
}

function getSize() {
    const buttons = document.querySelectorAll(".board-size-btn"); // getting all the data from the buttons 
    buttons.forEach(function (button) { // for each loop on the buttons and checking for event click on them 
        button.addEventListener("click", function () {
            const rows = parseInt(button.getAttribute("data-rows"));
            const cols = parseInt(button.getAttribute("data-cols"));
            setupGame(rows, cols);
            document.querySelector(".memory-game").style.display = "block";
            document.querySelector(".grid-size").style.display = "none";
            startTimer();

        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    getSize();
});

function createCards(cardsArray, rows, columns) {
    const grid = document.querySelector('.grid');
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // calculate the total number of cards needed to fill the grid
    const totalCardsNeeded = rows * columns;

    // duplicate the cardsArray to ensure we have enough cards
    duplicatedCardsArray = cardsArray.slice();
    while (duplicatedCardsArray.length < totalCardsNeeded) {
        duplicatedCardsArray = duplicatedCardsArray.concat(cardsArray.slice());
    }

    // shuffle the duplicated cardsArray
    duplicatedCardsArray.sort(() => Math.random() - 0.5);

    // create card elements and append them to the grid
    duplicatedCardsArray.slice(0, totalCardsNeeded).forEach((card, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.isMatched = 'false';
        cardElement.dataset.flipped = 'false'; // track if the card is flipped
        cardElement.innerHTML = `<span>${card}</span>`;
        cardWrapper.appendChild(cardElement);
        grid.appendChild(cardWrapper);

        cardWrapper.addEventListener('click', function () {
            if (canFlip(this)) { // check if the card can be flipped
                checkMatch(cardElement);
            }
        });
    });
}


function canFlip(cardWrapper) {
    const flippedCount = document.querySelectorAll('.card[data-flipped="true"][data-is-matched="false"]').length;
    if (cardWrapper.querySelector('.card[data-isMatched="true"]')) {
        return false;
    }
    return flippedCount < 2 || cardWrapper.querySelector('.card[data-flipped="true"]'); // allow flipping if less than 2 cards are flipped or if the clicked card is already flipped
}

function flipCard(cardElement, toFlipped = true) {
    if (toFlipped) {
        cardElement.classList.toggle('flipped');
    }
    cardElement.dataset.flipped = cardElement.classList.contains('flipped') ? 'true' : 'false';
}

function checkMatch(cardElement) {
    flipCard(cardElement)
    const cardsFlipped = document.querySelectorAll('.card[data-flipped="true"][data-is-matched="false"]')
    const flippedCount = cardsFlipped.length;
    const pairs = duplicatedCardsArray.length / 2


    if (flippedCount === 2) {
        setTimeout(() => {
            const [firstFlippedCard, secondFlippedCard] = cardsFlipped;
            if (firstFlippedCard.innerText === secondFlippedCard.innerText) {
                firstFlippedCard.dataset.isMatched = 'true';
                secondFlippedCard.dataset.isMatched = 'true';
                guessCount++;
                if (guessCount === pairs) {
                    won.innerText = (`${player_name} Won!`)
                    winner = true
                    stopTimer();
                }

            }
            else {
                flipCard(firstFlippedCard)
                flipCard(secondFlippedCard)
            }
        }, 500);
    }

}

function setupGame(rows, columns) {
    if (rows === 4 && columns === 4) {
        const cards4x4 = [
            '🐶', '🐶',
            '🐱', '🐱',
            '🐭', '🐭',
            '🐹', '🐹',
            '🦊', '🦊',
            '🐻', '🐻',
            '🐼', '🐼',
            '🐨', '🐨'
        ];
        createCards(cards4x4, rows, columns);

    }

    if (rows === 4 && columns === 3) {
        const cards4x3 = [
            '🐶', '🐶',
            '🐱', '🐱',
            '🐭', '🐭',
            '🐹', '🐹',
            '🦊', '🦊',
            '🐻', '🐻'
        ];
        createCards(cards4x3, rows, columns);

    }

    if (rows === 5 && columns === 4) {
        const cards5x4 = [
            '🐶', '🐶',
            '🐱', '🐱',
            '🐭', '🐭',
            '🐹', '🐹',
            '🦊', '🦊',
            '🐻', '🐻',
            '🐼', '🐼',
            '🐨', '🐨',
            '🐯', '🐯',
            '🦁', '🦁'
        ];
        createCards(cards5x4, rows, columns);

    }

    if (rows === 6 && columns === 5) {
        const cards6x5 = [
            '🐶', '🐶',
            '🐱', '🐱',
            '🐭', '🐭',
            '🐹', '🐹',
            '🦊', '🦊',
            '🐻', '🐻',
            '🐼', '🐼',
            '🐨', '🐨',
            '🐯', '🐯',
            '🦁', '🦁',
            '🐵', '🐵',
            '🐘', '🐘',
            '🐼', '🐼',
            '🦄', '🦄'
        ];
        createCards(cards6x5, rows, columns);

    }

}

function startNewGame() {
    location.reload();
}


function toggleScoreTable() {
    const scoreTable = document.getElementById('scoreTable');
    timeStamp = document.getElementById("durationDisplay").textContent
    if (winner) {
        scoreTable.style.display = "block";
        updateScoreTable(player_name, timeStamp);
    } else {
        scoreTable.style.display = "none";
    }
}

function updateScoreTable() {
    const scoreBody = document.getElementById('scoreBody');
    scoreBody.innerHTML = ""; // clear existing rows

    const capitalizedPlayerName = player_name.charAt(0).toUpperCase() + player_name.slice(1);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${capitalizedPlayerName}</td><td>${timeStamp}</td>`;
    scoreBody.appendChild(newRow);
}
let startTime = 0;
let endTime = 0;
let durationInSeconds = 0;
let timerInterval;
let player_name;

// function startTimer() {
//     startTime = performance.now();
//     timerInterval = setInterval(updateTimerDisplay, 1000); // Update every second
// }

// function stopTimer() {
//     clearInterval(timerInterval); // Stop the interval
// }

// function updateTimerDisplay() {
//     const currentTime = performance.now();
//     const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
//     displayTimer(elapsedSeconds);
// }

// function displayTimer(durationInSeconds) {
//     document.getElementById("durationDisplay").textContent = `Time: ${durationInSeconds}`;
// }


function getName() {
    player_name = document.getElementById("nameInput").value;
    if (player_name.trim() !== "") {
        document.querySelector(".memory-game").style.display = "block";
        document.querySelector(".nameHolder").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
    // startTimer();
}

function createCards(cardsArray, rows, columns) {
    const grid = document.querySelector('.grid');
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Calculate the total number of cards needed to fill the grid
    const totalCardsNeeded = rows * columns;

    // Duplicate the cardsArray to ensure we have enough cards
    let duplicatedCardsArray = cardsArray.slice();
    while (duplicatedCardsArray.length < totalCardsNeeded) {
        duplicatedCardsArray = duplicatedCardsArray.concat(cardsArray.slice());
    }

    // Shuffle the duplicated cardsArray
    duplicatedCardsArray.sort(() => Math.random() - 0.5);

    // Create card elements and append them to the grid
    duplicatedCardsArray.slice(0, totalCardsNeeded).forEach((card, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.flipped = 'false'; // Track if the card is flipped
        cardElement.innerHTML = `<span>${card}</span>`;
        cardWrapper.appendChild(cardElement);
        grid.appendChild(cardWrapper);

        cardWrapper.addEventListener('click', function () {
            if (canFlip(this)) { // Check if the card can be flipped
                flipCard(cardElement);
            }
        });
    });
}


function canFlip(cardWrapper) {
    const flippedCount = document.querySelectorAll('.card[data-flipped="true"]').length;
    return flippedCount < 2 || cardWrapper.querySelector('.card[data-flipped="true"]'); // Allow flipping if less than 2 cards are flipped or if the clicked card is already flipped
}

function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
    cardElement.dataset.flipped = cardElement.classList.contains('flipped') ? 'true' : 'false'; // Update the dataset
}

function setupGame(rows, columns) {
    const cards = [
        '🐶', '🐶',
        '🐱', '🐱',
        '🐭', '🐭',
        '🐹', '🐹',
        '🐰', '🐰',
        '🦊', '🦊'
    ];

    createCards(cards, rows, columns);

}

// Example usage:
setupGame(4, 3); // 4x3 grid
// setupGame(6, 6); // 6x6 grid

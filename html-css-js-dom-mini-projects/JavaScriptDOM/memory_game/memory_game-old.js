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
    cardsArray.sort(() => Math.random() - 0.5);

    cardsArray.forEach((card, index) => {
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

    let firstCard = null;
    let secondCard = null;
    let pairsFound = 0;

    const grid = document.querySelector('.grid');
    let canFlip = true;

    grid.addEventListener('click', function (event) {
        const clickedCard = event.target.closest('.card');
        if (!clickedCard || !canFlip) return;

        if (!clickedCard.classList.contains('flipped')) {
            flipCard(clickedCard);
        }

        const flippedCards = document.querySelectorAll('.card.flipped');
        if (flippedCards.length === 2) {
            canFlip = false; // Prevent flipping more cards
            setTimeout(() => {
                const [firstFlippedCard, secondFlippedCard] = flippedCards;
                if (firstFlippedCard.innerText === secondFlippedCard.innerText) {
                    firstFlippedCard.dataset.flipped = 'matched';
                    secondFlippedCard.dataset.flipped = 'matched';
                    pairsFound++;
                    console.log(`Pairs found: ${pairsFound}`);
                } else {
                    flipCard(firstFlippedCard);
                    flipCard(secondFlippedCard);
                }
                canFlip = true; // Allow flipping more cards after a short delay
            }, 1000);
        } else if (flippedCards.length === 0) {
            canFlip = true; // Reset canFlip if no cards are flipped
        }
    });
}

// Example usage:
setupGame(4, 3); // 4x3 grid

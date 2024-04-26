let player_name;



function getName() {
    player_name = document.getElementById("nameInput").value;
    // get player name and shows the game ui
    if (player_name.trim() !== "") {
        document.querySelector(".memory-game").style.display = "block";
        document.querySelector(".nameHolder").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
}

function createCards(cardsArray, rows, columns) {
    const grid = document.querySelector('.grid');
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // calculate the total number of cards needed to fill the grid
    const totalCardsNeeded = rows * columns;

    // duplicate the cardsArray to ensure we have enough cards
    let duplicatedCardsArray = cardsArray.slice();
    while (duplicatedCardsArray.length < totalCardsNeeded) {
        duplicatedCardsArray = duplicatedCardsArray.concat(cardsArray.slice());
    }

    // shuffle the duplicated cardsArray
    duplicatedCardsArray.sort(() => Math.random() - 0.5);

    // Create card elements and append them to the grid
    duplicatedCardsArray.slice(0, totalCardsNeeded).forEach((card, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.isMatched = 'false';
        cardElement.dataset.flipped = 'false'; // Track if the card is flipped
        cardElement.innerHTML = `<span>${card}</span>`;
        cardWrapper.appendChild(cardElement);
        grid.appendChild(cardWrapper);

        cardWrapper.addEventListener('click', function () {
            if (canFlip(this)) { // Check if the card can be flipped
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
    return flippedCount < 2 || cardWrapper.querySelector('.card[data-flipped="true"]'); // Allow flipping if less than 2 cards are flipped or if the clicked card is already flipped
}

function flipCard(cardElement, toFlipped = true) {
    if(toFlipped)
    {
        cardElement.classList.toggle('flipped');
    }
    cardElement.dataset.flipped = cardElement.classList.contains('flipped') ? 'true' : 'false';
}

function checkMatch(cardElement) {
    flipCard(cardElement)
    const cardsFlipped = document.querySelectorAll('.card[data-flipped="true"][data-is-matched="false"]')
    const flippedCount = cardsFlipped.length;
    console.log("count is : ",flippedCount);
    if (flippedCount === 2) {
        setTimeout(() => {
            const [firstFlippedCard, secondFlippedCard] = cardsFlipped;
            if (firstFlippedCard.innerText === secondFlippedCard.innerText) {
                firstFlippedCard.dataset.isMatched = 'true';
                secondFlippedCard.dataset.isMatched = 'true';
            }
            else{
                flipCard(firstFlippedCard)
                flipCard(secondFlippedCard)
            }
        }, 500);
    }
    
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

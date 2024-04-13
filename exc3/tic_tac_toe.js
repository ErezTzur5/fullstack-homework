let board;
let player_x_name;
let player_o_name;
let currentPlayer;
let player_symbols = {};

let scores = {};

function switchPlayer() {
    currentPlayer = currentPlayer === player_x_name ? player_o_name : player_x_name;
    // this function checks if the current player is equal  to the currect player
    // if it is , its assings the name of the second player that give me the option to switch between players easliy
}

function CheckRow(row_number) {
    let row = board[row_number];
    let symbol = row[0];
    for (let index = 1; index < row.length; index++) {
        if (row[index] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
    // checks for win in the row
}

function CheckColumn(column_number) {
    let symbol = board[0][column_number];
    for (let index = 1; index < board.length; index++) {
        if (board[index][column_number] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
    // checks for win in the column
}

function CheckDiagonal() {
    let symbol = board[0][0];
    for (let index = 1; index < board.length; index++) {
        if (board[index][index] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
    // checks for win in the diagonal
}

function CheckReverseDiagonal() {
    let symbol = board[0][board.length - 1];
    for (let index = 1; index < board.length; index++) {
        if (board[index][board.length - 1 - index] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
    // checks for win in the diagonal in reverse order
}

function CreateBoard(number) {
    board = [];
    for (let i = 0; i < number; i++) {
        let row = []
        for (let j = 0; j < number; j++) {
            row.push('[]')
        }
        board.push(row)
    }
    return board;
    // gets from the user the size of the board and creates the board
}

function isWin() {
    for (let index = 0; index < board.length; index++) {
        if (CheckRow(index) || CheckColumn(index)) {
            return true;
        }
    }

    if (CheckDiagonal() || CheckReverseDiagonal()) {
        return true;
    }

    return false;
    // wraps all the wins options into a single function and call the function in every move in the game
}

function validateInput(input) {
    if (input < 0 || input >= board.length) {
        console.log(`Please enter a number between 0 ${board.length}`);
        return false;
    }
    let inputNumber = Number(input)
    if (isNaN(inputNumber)) {
        console.log("Please enter a number and not string");
        return false;
    }
    if (!Number.isInteger(inputNumber)) {
        console.log("Please enter an integer and not float");
        return false;

    }
    return true;
    // wraps all the validation options into a single function and call the function in every move in the game to make sure user input is valid
}

function xTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    if (!validateInput(row)) {
        return xTurn();
    }
    let column = parseFloat(prompt('Enter the column: '));
    if (!validateInput(column)) {
        return xTurn();
    }

    if (board[row][column] === '[]') {
        board[row][column] = player_symbols[currentPlayer];

        console.log(board.join("\n"));
        if (isWin()) {
            console.log(`${currentPlayer} wins!`);
            scores[currentPlayer]++;
            return true;
        }
        switchPlayer();
    } else {
        console.log('This place is already taken');
        return xTurn();
    }

    return false;

}

function oTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    if (!validateInput(row)) {
        return oTurn();
    }
    let column = parseFloat(prompt('Enter the column: '));
    if (!validateInput(column)) {
        return oTurn();
    }

    if (board[row][column] === '[]') {
        board[row][column] = player_symbols[currentPlayer];

        console.log(board.join("\n"));

        if (isWin()) {
            console.log(`${currentPlayer} wins!`);
            scores[currentPlayer]++;
            return true;
        }
        switchPlayer();
    } else {
        console.log('This place is already taken');
        return oTurn();
    }

    return false;
}

function printStats() {
    let stats = 'Scores\n';
    for (let player in scores) {
        stats += `${player}: ${scores[player]}\n`;
    }
    console.log(stats);
    // prints the scoreboard when the game is over or when starting a new game
}

function startAnotherGame() {
    printStats();
    let ask = prompt("Do you want to start new game?: (Y/N)")
    if (ask.toLowerCase() == 'y') {
        console.log("New game Starting ...")
        startGame();
    }
    if (ask.toLowerCase() == 'n') {
        console.log("Game Stopped")
        printStats();
        scores = {};
        return;
    }
    else {
        console.log("Please input Y/N")
        startAnotherGame()

    }
    // starts a new game
}
function chooseSymbol(playerName) {
    let choice = prompt(`${playerName}, do you want to play as X or O? (X/O)`);
    if (choice.toUpperCase() == 'X' || choice.toUpperCase() == 'O') {
        return choice.toUpperCase();

    }
    else {
        console.log("Please input X/O!")
        chooseSymbol(playerName)
    }
    // let the user choose between X and O
}

function startGame() {
    console.log('Welcome to Tic-Tac-Toe');

    player_x_name = prompt('Please enter name for the first player: ')
    player_x_name = player_x_name.charAt(0).toUpperCase() + player_x_name.slice(1);

    player_o_name = prompt('Please enter name for the second player: ')
    player_o_name = player_o_name.charAt(0).toUpperCase() + player_o_name.slice(1);

    let xChoice = chooseSymbol(player_x_name);
    let oChoice = xChoice === 'X' ? 'O' : 'X';

    currentPlayer = xChoice === 'X' ? player_x_name : player_o_name;
    player_symbols[player_x_name] = xChoice;
    player_symbols[player_o_name] = oChoice;

    if (!scores[player_x_name]) {
        scores[player_x_name] = 0;
    }
    if (!scores[player_o_name]) {
        scores[player_o_name] = 0;
    }

    let size_board = parseInt(prompt('Enter the size of the board: '));

    CreateBoard(size_board);
    console.log(board.join("\n"));

    let gameOver = false;
    while (!gameOver) {
        if (currentPlayer === player_x_name) {
            gameOver = xTurn();
        } else {
            gameOver = oTurn();
        }
    }

    if (gameOver) {
        console.log('Game over!');
        startAnotherGame()
    }
}

startGame();
let board;
let player_x_name;
let player_o_name;
let currentPlayer;
let player_symbols = {};

let scores = {};

function switchPlayer() {
    currentPlayer = currentPlayer === player_x_name ? player_o_name : player_x_name;
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
}

function CheckColumn(column_number) {
    let symbol = board[0][column_number];
    for (let index = 1; index < board.length; index++) {
        if (board[index][column_number] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
}

function CheckDiagonal() {
    let symbol = board[0][0];
    for (let index = 1; index < board.length; index++) {
        if (board[index][index] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
}

function CheckReverseDiagonal() {
    let symbol = board[0][board.length - 1];
    for (let index = 1; index < board.length; index++) {
        if (board[index][board.length - 1 - index] !== symbol || symbol === '[]') {
            return false;
        }
    }
    return true;
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
}

function validateInput(input) {
    if (input < 0 || input > board.length) {
        alert(`Please enter a number between 0 ${board.length}`);
        return false;
    }
    let inputNumber = Number(input)
    if (isNaN(inputNumber)) {
        alert("Please enter a number and not string");
        return false;
    }
    if (!Number.isInteger(inputNumber)) {
        alert("Please enter an integer and not float");
        return false;

    }
    return true;
}

function xTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    if (!validateInput(row)) {
        xTurn();
    }
    let column = parseFloat(prompt('Enter the column: '));
    if (!validateInput(column)) {
        xTurn();
    }

    if (board[row][column] === '[]') {
        board[row][column] = player_symbols[currentPlayer];
        alert(board.join("\n"));
        if (isWin()) {
            // alert(`${player_symbols[currentPlayer]} wins!`);
            alert(`${currentPlayer} wins!`);
            scores[currentPlayer]++;
            return true;
        }
        switchPlayer();
    } else {
        alert('This place is already taken');
        xTurn();
    }

    return false;
}

function oTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    if (!validateInput(row)) {
        oTurn();
    }
    let column = parseFloat(prompt('Enter the column: '));
    if (!validateInput(column)) {
        oTurn();
    }

    if (board[row][column] === '[]') {
        board[row][column] = player_symbols[currentPlayer];
        alert(board.join("\n"));
        if (isWin()) {
            // alert(`${player_symbols[currentPlayer]} wins!`);
            alert(`${currentPlayer} wins!`);
            scores[currentPlayer]++;
            return true;
        }
        switchPlayer();
    } else {
        alert('This place is already taken');
        oTurn();
    }

    return false;
}

function printStats() {
    let stats = 'Scores\n';
    for (let player in scores) {
        stats += `${player}: ${scores[player]}\n`;
    }
    alert(stats);
}

function startAnotherGame() {
    printStats();
    let ask = prompt("Do you want to start new game?: (Y/N)")
    if (ask.toLowerCase() == 'y') {
        alert("New game Starting ...")
        startGame();
    }
    if (ask.toLowerCase() == 'n') {
        alert("Game Stopped")
        printStats();
        scores = {};
        return;
    }
    else {
        alert("Please input Y/N")
        startAnotherGame()

    }
}
function chooseSymbol(playerName) {
    let choice = prompt(`${playerName}, do you want to play as X or O? (X/O)`);
    if (choice.toUpperCase() == 'X' || choice.toUpperCase() == 'O') {
        return choice.toUpperCase();

    }
    else {
        alert("Please input X/O!")
        chooseSymbol(playerName)
    }

}

function startGame() {
    alert('Welcome to Tic-Tac-Toe');

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
    alert(board.join("\n"));

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


startGame();

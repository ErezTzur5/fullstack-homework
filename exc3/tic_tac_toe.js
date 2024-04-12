let board;
let player_x_name;
let player_y_name;
let currentPlayer = player_x_name;


function switchPlayer() {
    currentPlayer = currentPlayer === player_x_name ? player_y_name : player_x_name;
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

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function checkValidation(row_input, column_input) {
    if (!Number.isInteger(row_input) || !Number.isInteger(column_input) || row_input < 0 || column_input < 0) {
        alert(`Please enter valid positive whole numbers for row and column inputs.`);
        return false;
    }
    if (isNaN(row_input) || isNaN(column_input)) {
        alert(`You can't enter characters. Please enter digits.`);
        return false;
    }
    if (row_input >= board.length || column_input >= board.length) {
        alert(`Please enter digits from 0 to ${board.length - 1}.`);
        return false;
    }
    return true;
}


function xTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    let column = parseFloat(prompt('Enter the column: '));
    let isValid = checkValidation(row, column);
    if (isValid) {
        if (board[row][column] === '[]') {
            board[row][column] = 'x';
            alert(board.join("\n"));
            if (isWin()) {
                alert(`${player_x_name} wins!`);
                return true;
            }
            switchPlayer(); // Switch to the next player
        } else {
            alert('This place is already taken');
            xTurn();
        }
    } else {
        xTurn();
    }
    return false;
}

function oTurn() {
    let row = parseFloat(prompt('Enter the row: '));
    let column = parseFloat(prompt('Enter the column: '));
    let isValid = checkValidation(row, column);
    if (isValid) {
        if (board[row][column] === '[]') {
            board[row][column] = 'o';
            alert(board.join("\n"));
            if (isWin()) {
                alert(`${player_y_name} wins!`);
                return true;
            }
            switchPlayer(); // Switch to the next player
        } else {
            alert('This place is already taken');
            oTurn();
        }
    } else {
        oTurn();
    }
    return false;
}


function startAnotherGame() {
    let ask = prompt("Do you want to start new game?: (Y/N)")
    if (ask.toLowerCase() == 'y') {
        alert("New game Starting ...")
        startGame();
    }
    if (ask.toLowerCase() == 'n') {
        alert("Game Stopped")
        return;
    }

}

function startGame() {
    alert('Welcome to Tic-Tac-Toe');

    player_x_name = prompt('Please enter name for the first player(X): ')

    player_y_name = prompt('Please enter name for the second player(Y): ')

    let size_board = parseInt(prompt('Enter the size of the board: '));

    CreateBoard(size_board);
    alert(board.join("\n"));


    let gameOver = false;
    while (!gameOver) {
        gameOver = xTurn();
        if (gameOver) break;
        gameOver = oTurn();
    }

    if (gameOver) {
        console.log('Game over!');
        startAnotherGame()
    }
}

startGame();



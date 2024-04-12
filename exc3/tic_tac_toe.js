let board;

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

function xTurn() {
    let row = parseInt(prompt('Enter the row: '));
    let column = parseInt(prompt('Enter the column: '));
    if (board[row][column] === '[]') {
        board[row][column] = 'x';
        alert(board.join("\n"));
    } else {
        alert('This place is already taken');
        xTurn();
    }
    if (isWin()) {
        alert('x win');
        return true;
    }
    return false;
}

function oTurn() {
    let row = parseInt(prompt('Enter the row: '));
    let column = parseInt(prompt('Enter the column: '));
    if (board[row][column] === '[]') {
        board[row][column] = 'o';
        alert(board.join("\n"));
    } else {
        alert('This place is already taken');
        oTurn();
    }
    if (isWin()) {
        alert('o win');
        return true;
    }
    return false;
}

function startGame() {
    alert('Welcome to Tic-Tac-Toe');
    let size_board = parseInt(prompt('Enter the size of the board: '));
    console.log(size_board);
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
        return;
    }
}

startGame();

let board;

function CheckRow(row_number) {
    let row = board[row_number];
    let counter = 1;
    for (let index = 0; index < row.length - 1; index++) {
        if (row[index] !== '[]' && row[index] === row[index + 1]) {
            counter++;
        }
        if (counter === row.length) {
            return true;
        }
    }
    return false;
}

function CheckColumn(column_number) {
    let counter = 1;
    for (let index = 0; index < board.length - 1; index++) {
        if (board[index][column_number] !== '[]' && board[index][column_number] === board[index + 1][column_number]) {
            counter++;
        }
        if (counter === board.length) {
            return true;
        }
    }
    return false;
}

function CheckDiagonal() {
    let counter = 1;
    for (let index = 0; index < board.length - 1; index++) {
        if (board[index][index] !== '[]' && board[index][index] === board[index + 1][index + 1]) {
            counter++;
        }
        if (counter === board.length) {
            return true;
        }
    }
    return false;
}

function CheckReverseDiagonal() {
    let counter = 1;
    for (let index = board.length - 1; index > 0; index--) {
        if (board[board.length - index - 1][index] !== '[]' && board[board.length - index - 1][index] === board[board.length - index][index - 1]) {
            counter++;
        }
        if (counter === board.length) {
            return true;
        }
    }
    return false;
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
    let result_row, result_column;

    for (let index = 0; index < board.length; index++) {
        result_row = CheckRow(index);
        result_column = CheckColumn(index);
    }

    let result_diagonal = CheckDiagonal();
    let result_reverse_diagonal = CheckReverseDiagonal();
    if (result_row || result_column || result_diagonal || result_reverse_diagonal) {
        return true;
    }
    return false;
}

function xTurn() {
    let row = parseInt(prompt('Enter the row: '));
    let column = parseInt(prompt('Enter the column: '));
    if (board[row][column] === '[]') {
        board[row][column] = 'x';
        console.log(board);
    } else {
        alert('This place is already taken');
        xTurn();
    }
    if (isWin()) {
        console.log('x win');
        return true;
    }
    return false;
}

function oTurn() {
    let row = parseInt(prompt('Enter the row: '));
    let column = parseInt(prompt('Enter the column: '));
    if (board[row][column] === '[]') {
        board[row][column] = 'o';
        console.log(board);
    } else {
        alert('This place is already taken');
        oTurn();
    }
    if (isWin()) {
        console.log('o win');
        return true;
    }
    return false;
}

function startGame() {
    alert('Welcome to Tic-Tac-Toe');
    let size_board = parseInt(prompt('Enter the size of the board: '));
    CreateBoard(size_board);
    console.log(board);
    let gameWon = false;
    while (!gameWon) {
        gameWon = xTurn();
        if (gameWon) break;
        gameWon = oTurn();
    }
}

startGame();

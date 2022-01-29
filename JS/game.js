'use strict';

var gBoard;
var MINES = '💣';
var CELL = {
    minesAroundCount: 0,
    isShown: true,
    isMine: true,
    isMarked: true
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,     //1)isOn: Boolean, when true we let the user play.
    shownCount: 0,   //2)shownCount: How many cells are shown.
    markedCount: 0,  //3)markedCount: How many cells are marked (with a flag).
    secsPassed: 0    //4)secsPassed: How many seconds passed .
}

function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    // setMinesNegsCount(gBoard)
}


function buildBoard() {
    var board = createMat(4, 4);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = (Math.random() > 0.2) ? CELL : CELL.isMine == false
            // var numOfNegs = setMinesNegsCount(i, j, board);
            // if (CELL != MINES) {
            //     CELL.minesAroundCount = numOfNegs
            // }

        }
    }
    return board;
}
console.table(buildBoard(gBoard))


function setMinesNegsCount(cellI, cellJ, board) {
    var minesAroundCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine != true) minesAroundCount++;
        }
    }
    return minesAroundCount;
}


function cellClicked(elCell, i, j) {
    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard[0].length; j++) {


    var numOfNegs = setMinesNegsCount(i, j, gBoard);
    if (gBoard[i][j].isMine) {
        CELL.minesAroundCount === numOfNegs
    } else if (elCell.innerHTML == MINES) checkGameOver();
    

    //     }
    // }
        if(gBoard[i][j].isMine){
            elCell.classList.add('good')
            elCell.innerHTML = numOfNegs
        }
        else{
            // elCell.classList.add('boom')
            elCell.innerHTML = MINES
        }

}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            strHTML += `<td class="${cell}"
            onclick="cellClicked(this , ${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}


function checkGameOver() {
    alert('game over!');
    renderBoard(gBoard);

}
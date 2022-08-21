const playerXClass = 'x'
const playerOClass = 'circle'

const winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')

const boardElement = document.getElementById('board')

const winnerMessageElement = document.getElementById('winnerMessage')

const restartButton = document.getElementById('restartButton')

const winnerMessageTextElement = document.getElementById('winnerMessageText')

let isPlayerOTurn = false

startGame()


restartButton.addEventListener('click', startGame)

function startGame() {
    isPlayerOTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerXClass)
        cell.classList.remove(playerOClass)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })

    setBoardHoverClass()
   
    winnerMessageElement.classList.remove('show')
}

function handleCellClick(e) {
    const cell = e.target
    
    const currentClass = isPlayerOTurn ? playerOClass : playerXClass
  
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    /* Checking if it is a draw. If it is, it is setting the winnerMessageTextElement to
    a draw. */
    if (draw) {
        winnerMessageTextElement.innerText = 'It is a draw'
    } /* Checking if it is player O's turn. If it is, it is setting the winnerMessageElement to
    Player with O's wins! If it is not, it is setting the winnerMessageElement to Player with X's
    wins! */
    else {
        winnerMessageTextElement.innerText = `Player with ${isPlayerOTurn ? "O's" : "X's"} wins!`
    }
 
    winnerMessageElement.classList.add('show')
}

// This one just returns the value in case there is a draw
function isDraw() {
    /* Checking if every cell contains either the playerXClass or the playerOClass. If it
    does, it is returning true. If it does not, it is returning false. */
    return[...cellElements].every(cell => {
        return cell.classList.contains(playerXClass) || cell.classList.contains(playerOClass)
    })
}

/**
 * The placeMark function takes two arguments, a cell and a currentClass, and adds the currentClass to
 * the cell's classList.
 * @param cell - the cell that was clicked
 * @param currentClass - the class that is being added to the cell
 */
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

/**
 * If it's player O's turn, then it's now player X's turn. If it's player X's turn, then it's now
 * player O's turn.
 */
function swapTurns() {
    isPlayerOTurn = !isPlayerOTurn
    document.getElementById('text-change').innerHTML = `It is player ${isPlayerOTurn ? "O": "X"}`
}

function setBoardHoverClass() {
    boardElement.classList.remove(playerXClass)
    boardElement.classList.remove(playerOClass)
    if (isPlayerOTurn) {
        boardElement.classList.add(playerOClass)
    } else {
        boardElement.classList.add(playerXClass)
    }
}

/**
 * If any of the winning combinations are true, then return true.
 * @param currentClass - The class of the current player.
 * @returns a boolean value.
 */
function checkWin(currentClass) {
    return winnerCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

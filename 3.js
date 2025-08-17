const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (gameState[index] !== "" || !running) {
        return;
    }

    gameState[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let winner = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = `Player ${currentPlayer} wins! `;
        running = false;
    } 
    else if (!gameState.includes("")) {
        statusText.textContent = "It's a draw! ";
        running = false;
    } 
    else {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => cell.textContent = "");
}

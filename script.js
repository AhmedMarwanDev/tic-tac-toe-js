const message = document.querySelector(".message");
const cellsContainer = document.querySelector(".cells-container");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart-button");
const playerXwinsP = document.querySelector(".score-x");
const playerOwinsP = document.querySelector(".score-o");
const drawP = document.querySelector(".draw");

let board = Array(9).fill("");
let player = "x";
let gameOver = false;
let winner = "";
let playerXwins = 0;
let playerOwins = 0;
let draw = 0;

const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

render();

function handleClick (index) {
    if (board[index] !== "" || gameOver) return;

    board[index] = player;
    checkWinner();
    switchPlayer();
    render();
};

cellsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;

    handleClick(e.target.dataset.index);
})

function checkWinner () {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] !== "" && board[a] == board[b] && board[b] == board[c]) {
            gameOver = true;
            winner = player;

            cells.forEach((cell) => {
                const index = cell.dataset.index;
                if (index != a && index != b && index != c) return;
                cell.classList.add("win");
            });
        };
    });

    if (!board.includes("") && !gameOver) {
        gameOver = true;
        winner = "draw";
    };

    if (gameOver) {
        updateScores();
    };
};

function switchPlayer () {
    player = (player == "x") ? "o" : "x";
}

function updateScores () {
    switch (winner) {
        case "x":
            playerXwins++;
            playerXwinsP.textContent = playerXwins;
            break;
        case "o":
            playerOwins++;
            playerOwinsP.textContent = playerOwins;
            break;
        case "draw":
            draw++;
            drawP.textContent = draw;
            break;
    };
};

function render () {
    cells.forEach(cell => {
        const index = cell.dataset.index;

        cell.textContent = board[index];
        if (board[index] !== ""){
            cell.classList.add(`cell-${board[index]}`);
        } else {
            cell.classList.remove("cell-x");
            cell.classList.remove("cell-o");
            cell.classList.remove("win");
            cellsContainer.classList.remove("draw");
        };
    });

    if (!gameOver) {
        message.textContent = `Player ${player} turn`;
        message.classList.remove("pop-message");
    } else if (gameOver && winner == "draw") {
        message.textContent = "It's a draw! Try again! 🤝"
        message.classList.add("pop-message");
        cellsContainer.classList.add("draw");
    } else if (gameOver && winner !== "draw") {
        message.textContent = `Player ${winner.toUpperCase()} wins! 🎉`;
        message.classList.add("pop-message");
    };
};

function restart () {
    if (board.every(value => value == "")) return;

    board = Array(9).fill("");
    player = "x";
    gameOver = false;
    winner = "";
    message.classList.remove("pop-message");
    render();
};

restartButton.addEventListener("click", restart);
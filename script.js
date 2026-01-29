function gameBoard() {
    const length = 9;
    let board = Array(length).fill("");

    const getBoard = () => board.slice();
    const resetBoard = () => {board = Array(length).fill(""); };
    const placeMark = (index, mark) => {
        if (index <0 || index >= board.length) return false;
        if (board[index] !== "") return false;
        board[index] = mark;
        return true
    }
    return { getBoard, resetBoard, placeMark };

}

function createPlayer(name, mark) {
    return {name, mark}
}
const Gameboard = gameBoard();

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4 ,7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const checkWinner = (board) => {
        for (const [a, b, c] of win) {
        const m = board[a];
        if (m !== "" && m === board[b] && m === board[c]) return m; // returns "X" or "O"
        }
        return null;
    };
    const checkTie = (board) => board.every((cell) => cell !== "");

    const startGame = (name1, name2) => {
        const player1 = createPlayer(name1, "X")
        const player2 = createPlayer(name2, "O")
        players = [player1, player2]
        currentPlayerIndex = 0
        Gameboard.resetBoard();
        gameOver = false
    };

    const playTurn = (index) => {
        const currentPlayer = players[currentPlayerIndex];
        if (gameOver) return;

        const success = Gameboard.placeMark(index, currentPlayer.mark);
        if (!success) return;

        const board = Gameboard.getBoard();
        const winnerMark = checkWinner(board)

        if (winnerMark) {
            gameOver = true;
            result = { type: "win", winner: currentPlayer, mark: winnerMark };
            return;
        }

        if (checkTie(board)) {
            gameOver = true;
            result = { type: "tie" };
            return;
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    };

  return { startGame, playTurn };
})();

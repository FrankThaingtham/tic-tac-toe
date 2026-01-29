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

const Gameboard = gameBoard();
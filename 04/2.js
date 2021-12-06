const { readFile } = require("fs/promises");

const Board = require("./Board.js");

readFile("./04/input.txt", "utf8")
// readFile("./04/sample.txt", "utf8")
.then(input => {
    const boards = [];
    const [ draw, ...boardStrings ] = input.split("\r\n\r\n");

    let badBoard;

    boardStrings.forEach(boardString => {
        boards.push(new Board(boardString));
    });

    let nonWinningBoards = boards.length;

    draw.split(",").some(d =>
        boards.some(board => {
            if (board.won) {
                return false;
            }

            board.checkdraw(d);

            if (board.won) {
                nonWinningBoards--;

                if (nonWinningBoards === 0) {
                    badBoard = board;

                    return true;
                }
            }

            return false;
        })
    );

    console.log(badBoard.score);
});

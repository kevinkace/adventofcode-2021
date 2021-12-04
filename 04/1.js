const { readFile } = require("fs/promises");

const Board = require("./Board.js");

readFile("./04/input.txt", "utf8")
// readFile("./04/sample.txt", "utf8")
.then(input => {
    const boards = [];
    const [ draw, ...boardStrings ] = input.split("\r\n\r\n");

    let winner;

    // console.log({ draw, boardStrings });

    boardStrings.forEach(boardString => {
        boards.push(new Board(boardString));
    });

    draw.split(",").some(d =>
        boards.some(board => {
            board.checkdraw(d);

            if (board.won) {
                console.log("we have a weiner");

                winner = board;

                return true;
            };

            return false;
        })
    );

    console.log(winner.score);
});

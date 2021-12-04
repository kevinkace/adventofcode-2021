module.exports = class Board {
    constructor(boardString) {
        this.boardString = boardString;
        this.numbers = boardString.split(/[\s|\r\n\r\n]/).filter(Boolean);

        this.cols = new Array(5).fill(0);
        this.rows = new Array(5).fill(0);

        this.hits = [];

        // console.log(this.numbers);
    }

    static arrSum(arr) {
        return arr
            .map(num => parseInt(num, 10))
            .reduce((acc, cur) => {
                acc += cur;
                return acc;
            }, 0);
    }

    get boardSum() {
        return Board.arrSum(this.numbers) - Board.arrSum(this.hits);
    }

    checkdraw(draw) {
        const idx = this.numbers.indexOf(draw);

        if (idx < 0) {
            return;
        }

        this.hits.push(draw);

        const col = idx % 5;
        const row = Math.floor(idx / 5);

        this.cols[col] = this.cols[col] + 1;
        this.rows[row] = this.rows[row] + 1;

        if (this.cols[col] === 5 || this.rows[row] === 5) {
            this.won = true;

            this.score = this.boardSum * parseInt(draw, 10);
        }
    }
}
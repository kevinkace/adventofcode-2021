const {readFile} = require("fs/promises");

readFile("./input.txt", "utf8")
.then(data => {
    // console.log(data);

    let prev, numInc = 0;

    data.split("\n").map(num => parseInt(num, 10)).forEach(curr => {
        if (!prev) {
            prev = curr;
            return;
        }

        if (prev < curr) {
            numInc++;
        }

        prev = curr;
    })

    console.log(numInc);
});
const { readFile } = require("fs/promises");

readFile("./input.txt", "utf8")
// readFile("./sample.txt", "utf8")
.then(data => {
    let prevSum,
        numInc = 0;

    data.split("\n")
        .map(num => parseInt(num, 10))
        .forEach((curr, idx, arr) => {
            const currSum = curr + arr[idx + 1] + arr[idx + 2];

            if (idx > arr.length - 3 || !prevSum) {
                prevSum = currSum;

                return;
            }

            if (prevSum < currSum) {
                numInc ++;
            }

            prevSum = currSum;
        });

    console.log(numInc);
});

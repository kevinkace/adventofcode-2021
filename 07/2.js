const { readFile } = require("fs/promises");

const MAX_ITERATIONS = 100000;
let iterations = 0;

function getTriangle(dist) {
    return (dist*(dist + 1)) / 2;
}

function getFuel(arr, mid) {
    let dists = 0;

    arr.forEach(el => {
        if (el === mid) {
            return;
        }

        dists += getTriangle(Math.abs(el - mid));
    });

    return dists;
}

readFile("./07/input.txt", "utf8")
// readFile("./07/sample.txt", "utf8")
.then(positionsString => {
    const positions = positionsString.split(",").map(position => parseInt(position, 10));

    const sorted = positions.sort((a, b) => a > b ? 1 : -1);

    let mid = (sorted[0] + sorted[sorted.length -1]) /2;

    let fuel  = getFuel(sorted, mid);
    let nFuel;

    let dir = 1;

    if (getFuel(sorted, mid + 1) > fuel) {
        dir = -1;
    }

    while ((!nFuel || nFuel < fuel) && iterations < MAX_ITERATIONS) {
        iterations++;

        mid += dir;
        fuel = nFuel || fuel;

        nFuel = getFuel(sorted, mid);
    }

    mid -= dir;

    console.log({ mid, fuel  });
});

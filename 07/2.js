const { readFile } = require("fs/promises");

const MAX = 100000;
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

// readFile("./07/input.txt", "utf8")
readFile("./07/sample.txt", "utf8")
.then(positionsString => {
    const positions = positionsString.split(",").map(position => parseInt(position, 10));

    const sorted = positions.sort((a, b) => a > b ? 1 : -1);

    let mid = sorted[Math.floor(sorted.length / 2)];

    let unique = [ ... new Set(sorted)];

    let rNext = unique[unique.indexOf(mid) + 1];
    let lNext = unique[unique.indexOf(mid) - 1];

    let midDist = getFuel(sorted, mid);
    let lDist   = getFuel(sorted, lNext);
    let rDist   = getFuel(sorted, rNext);

    if (lDist < midDist) {
        while (lDist < midDist && iterations < MAX) {
            iterations++;
            midDist = lDist;

            mid = lNext;
            lDist = getFuel(sorted, lNext);
            lNext = unique[unique.indexOf(mid) - 1];
        }
    }

    if (rDist < midDist) {
        while (rDist < midDist && iterations < MAX) {
            iterations++;
            midDist = rDist;

            mid = rNext;
            rDist = getFuel(sorted, rNext);
            rNext = unique[unique.indexOf(mid) + 1];
        }
    }


    console.log({ midDist, mid });
});

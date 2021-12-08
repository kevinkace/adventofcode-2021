const { readFile } = require("fs/promises");

const MAX = 100000;
let iterations = 0;

// function doStuff(arr, lDist, rDist, lCount, rCount, lPrev, rPrev) {
//     if (arr.length === 1 || (arr[0] === arr[arr.length - 1])) {
//         return arr[0];
//     }

//     if (lDist > rDist) {
//         const nextR = arr.pop();
//         const d = (nextR - arr[arr.length - 1]);

//         rDist = d ? rDist + d * (rCount + 1) : rDist + rCount;

//         rCount++;

//         return doStuff(arr, lDist, rDist, lCount, rCount, lPrev, d || rPrev);
//     }

//     const nextL = arr.shift();
//     const d = arr[0] - nextL;

//     lDist = d ? lDist + d * (lCount + 1) : lDist + lCount;

//     lCount++;

//     return doStuff(arr, lDist, rDist, lCount, rCount, d || lPrev, rPrev);
// }

function getDists(arr, mid) {
    let dists = 0;

    arr.forEach(el => {
        if (el === mid) {
            return;
        }

        dists += Math.abs(el - mid);
    });

    return dists;
}

readFile("./07/input.txt", "utf8")
// readFile("./07/sample.txt", "utf8")
.then(positionsString => {
    const positions = positionsString.split(",").map(position => parseInt(position, 10));

    const sorted = positions.sort((a, b) => a > b ? 1 : -1);

    // const sum = positions.reduce((acc, cur) => {
    //     return acc + cur;
    // }, 0);

    // const avg = sum / positions.length;

    // let lPrev, rPrev,
    //     lNext, rNext,
    //     lDist = 0, rDist = 0;

    // for (let l = 0, r = sorted.length - 1; l < (sorted.length / 2); l++, r--) {
    //     const ld = sorted[l + 1] - sorted[l];
    //     const rd =  sorted[r] - sorted[r - 1];

    //     lDist += (ld * (l + 1));
    //     rDist += (rd * (r + 1));
    // }

    // const shortest = doStuff(sorted, 0, 0, 0, 0, 0, 0);

    let mid = sorted[Math.floor(sorted.length / 2)];

    let dist = Number.POSITIVE_INFINITY;
    let unique = [ ... new Set(sorted)];

    let rNext = unique[unique.indexOf(mid) + 1];
    let lNext = unique[unique.indexOf(mid) - 1];

    let midDist = getDists(sorted, mid);
    let lDist   = getDists(sorted, lNext);
    let rDist   = getDists(sorted, rNext);

    if (lDist < midDist) {
        while (lDist < midDist && iterations < MAX) {
            iterations++;
            midDist = lDist;

            mid = lNext;
            lDist = getDists(sorted, lNext);
            lNext = unique[unique.indexOf(mid) - 1];
        }
    }

    if (rDist < midDist) {
        while (rDist < midDist && iterations < MAX) {
            iterations++;
            midDist = rDist;

            mid = rNext;
            rDist = getDists(sorted, rNext);
            rNext = unique[unique.indexOf(mid) + 1];
        }
    }


    console.log({ midDist, mid });
});

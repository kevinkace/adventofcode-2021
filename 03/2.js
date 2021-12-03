const { readFile } = require("fs/promises");

function bisect(arr, dir, pos, pref) {
    const l = [];
    const r = [];

    arr.forEach(line => {
        (line[pos] === "0" ? l : r).push(line);
    });

    if (l.length === r.length) {
        return pref === "0" ? l : r;
    }

    if (dir) {
        return l.length > r.length ? l : r;
    }

    return l.length < r.length ? l : r;
}

function getRating(arr, dir, pos, pref) {
    if (arr.length === 1) {
        return arr[0];
    }

    const side = bisect(arr, dir, pos, pref);

    return getRating(side, dir, ++pos, pref);
}

readFile("./input.txt", "utf8")
// readFile("./sample.txt", "utf8")
.then(diagRep => {
    const lines = diagRep.split("\r\n");

    let o2 = getRating(lines, true, 0, "1");
    let co2 = getRating(lines, false, 0, "0");

    o2 = parseInt(o2, 2);
    co2 = parseInt(co2, 2);

    console.log({ o2, co2, pr : o2 * co2 });
});

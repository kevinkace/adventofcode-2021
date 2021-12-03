const { readFile } = require("fs/promises");

readFile("./input.txt", "utf8")
// readFile("./sample.txt", "utf8")
.then(diagRep => {
    const lines = diagRep.split("\r\n");
    let gamma = (new Array(lines[0].length)).fill(0),
        epsilon;

    lines.forEach(line => {
        line.split("").forEach((char, idx) => {
            gamma[idx] += (char === "1" ? 1 : -1);
        });
    });

    epsilon = gamma.map(dig => (dig < 0 ? 1 : 0)).join("");
    gamma = gamma.map(dig => (dig > 0 ? 1 : 0)).join("");

    gamma = parseInt(gamma, 2);
    epsilon = parseInt(epsilon, 2);


    console.log({ gamma, epsilon, pr : gamma * epsilon });
});

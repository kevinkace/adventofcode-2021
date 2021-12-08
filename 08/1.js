const { readFile } = require("fs/promises");

readFile("./08/input.txt", "utf8")
// readFile("./08/sample.txt", "utf8")
.then(digitsString => {
    let count1478 = 0;
    const digitsLine = digitsString
        .split("\r\n")
        .map(line => {
            const [ signalPatterns, output ] = line
                .split(" | ").map(sect => sect.split(" "));

                count1478 += output.filter(o => ([ 2, 3, 4, 7 ].includes(o.length))).length;

            return {
                signalPatterns,
                output
            }
        });

    console.log({ count1478 });
});

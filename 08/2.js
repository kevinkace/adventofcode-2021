const { readFile } = require("fs/promises");

readFile("./08/input.txt", "utf8")
// readFile("./08/sample.txt", "utf8")
.then(digitsString => {
    const digits = digitsString
        .split("\r\n")
        .map(line => {
            const [ sig, output ] = line
                .split(" | ").map(sect => sect.split(" "));

            return {
                sig,
                output
            }
        });

    // verify each line has a 1
    // digits.forEach(({ sig, output }, idx) => {
    //     if (!sig.filter(s => s.length === 2).length && !output.filter(o => o.length === 2).length) {
    //         console.log(idx);
    //     }
    // });
});

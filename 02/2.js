const { readFile } = require("fs/promises");

readFile("./input.txt", "utf8")
// readFile("./sample.txt", "utf8")
.then(data => {
    let hor = 0,
        ver = 0,
        aim = 0;

    data.split("\n")
        // .map(num => parseInt(num, 10))
        .forEach((curr, idx, arr) => {
            let [ dir, amt ] = curr.split(" ");

            amt = parseInt(amt, 10);

            switch (dir) {
                case "forward":
                    hor += amt;
                    ver += aim * amt;
                    break;
                case "up":
                    aim -= amt;
                    // ver -= amt;
                    break;
                case "down":
                    aim += amt;
                    // ver += amt;
                    break;

                default:
                    break;
            }
        });

    console.log({ hor, ver, dist : hor * ver });
});

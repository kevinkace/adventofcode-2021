const { readFile } = require("fs/promises");

const coordRe = /^(\d*),(\d*) -> (\d*),(\d*)$/;

function getMoreThan(coordsByQuant, thresh, inc = true) {
    let sum = 0;

    Object.entries(coordsByQuant).forEach(([ count, coords ]) => {
        if (count < thresh || (count <= thresh && inc === false)) {
            return;
        }

        sum += Object.keys(coords).length;
    });

    return sum;
}

readFile("./04/input.txt", "utf8")
// readFile("./04/sample.txt", "utf8")
.then(ventCoordsString => {
    const ventCoords = {};
    const coordsByQuant = {
        // 1 : {
        //     "3,5" : true
        // },
        // 14 : {
        //     "5,7" : true
        // }
    };

    ventCoordsString.split("\r\n")
        .map(coordString =>
            // [ x1, y1, x2, y2 ]
            coordString.match(coordRe)
                .filter((el, idx) => ([ 1, 2, 3, 4 ].includes(idx)))
                .map(el => parseInt(el, 10))
        )
        .forEach(([ x1, y1, x2, y2 ]) => {
            if (x1 !== x2 && y1 !== y2) {
                return;
            }

            // console.log({ x1, y1, x2, y2 });

            const lowX = Math.min(x1, x2);
            const lowY = Math.min(y1, y2);

            const deltaX = Math.abs(x1 - x2);
            const deltaY = Math.abs(y1 - y2);


            for (let x = lowX; x <= lowX + deltaX; x++) {
                for (let y = lowY; y <= lowY + deltaY; y++) {
                    const coordKey = `${x},${y}`;

                    let ventsAtCoord = ventCoords[coordKey] || 0;

                    // update by quant
                    if (ventsAtCoord) {
                        // delete when 1 -> 0
                        delete coordsByQuant[ventsAtCoord][coordKey];
                    }

                    ventsAtCoord++;

                    coordsByQuant[ventsAtCoord] = coordsByQuant[ventsAtCoord] || {};
                    coordsByQuant[ventsAtCoord][coordKey] = true;

                    ventCoords[coordKey] = ventsAtCoord;
                }
            }
        });

        // console.log(JSON.stringify(ventCoords, null, 2));
        // console.log(JSON.stringify(coordsByQuant, null, 2));

        console.log(getMoreThan(coordsByQuant, 2));


    // console.log({ gamma, epsilon, pr : gamma * epsilon });
});

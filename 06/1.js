const { readFile } = require("fs/promises");

const BORN_DAYS   = 8;
const NORMAL_DAYS = 6;

function getTotal(queue) {
    return Object.values(queue).reduce((acc, cur) => acc + cur, 0);
}

function runSim(queue, days) {
    for (let day = 1; day <= days; day++) {
        let newBorns = 0,
            mothers = 0;

        for (let bornDay = 0; bornDay <= BORN_DAYS; bornDay++) {
            queue[bornDay] = queue[bornDay] || 0;

            const populationAtAge = queue[bornDay];

            // if (!populationAtAge) {
            //     continue;
            // }

            if (bornDay === 0) {
                newBorns = populationAtAge;
                mothers = populationAtAge;

                continue;
            }

            queue[bornDay - 1] = populationAtAge;

            if (bornDay === NORMAL_DAYS + 1) {
                queue[bornDay - 1] = queue[bornDay - 1] + mothers;
            }

            if (bornDay === BORN_DAYS) {
                queue[bornDay] = newBorns;
            }
        }
    }
}

readFile("./06/input.txt", "utf8")
// readFile("./06/sample.txt", "utf8")
.then(allDaysTill => {
    const queue = {
        // 8: 3, // just got popped
        // 7: 5,
        // 6: 3, // just popped
        // ...
        // 0 : 3 // about to pop!
    };

    allDaysTill.split(",")
    .map(daysTill => parseInt(daysTill, 10))
    .forEach(daysTill => {
        if (!queue[daysTill]) {
            queue[daysTill] = 0;
        }

        queue[daysTill]++;
    });

    runSim(queue, 80);

    // console.log(queue);

    console.log(getTotal(queue));
});

const readFile = require('./readFile');
const guards = {};
//* data example
// "[1518-02-13 23:47] Guard #2797 begins shift"
// "[1518-02-14 00:03] falls asleep"
// "[1518-02-14 00:22] wakes up"
// "[1518-02-14 00:41] falls asleep"
// "[1518-02-14 00:53] wakes up"
// "[1518-02-15 00:02] Guard #2267 begins shift"
// "[1518-02-15 00:11] falls asleep"
// "[1518-02-15 00:47] wakes up"

// DONE we need to sort the data by the timestamp

readFile('./day4_data.txt').then(lines => {
    let currentGuardID = null;

    // scan the line

    const sortedData = lines.sort((a, b) => {
        return getTime(a) - getTime(b)
    })

    // if the line contains GUARD then
    // create a new guard object/or use an exsisting object
    // if not , and we already have a guard id
    // process the data for the current id
    let id = null
    lines.forEach(line => {
        id = processLine(line, id);
    });


    let guard = processTimes(guards);

    console.log(guards[guard], guard)
})

//* gurad object
// id        - integer, the id of the gurad
// totalTime - integer, the total of all the minutes (should really be a function)
// [minutes] - array of integers, the calculated minutes from the wakes up/falls asleep times

// get the date/time

function getTime(line) {
    // just a quick function to help sort the data
    // remove some stuff we dont' need (- : ])
    let data = line.split(']')[0].replace(/-|:|\s|\[/g, '');

    return data;

}

function processLine(line, id) {
    // check the line for a ID number
    // if there is one - use
    // if there isn't - look for a new one
    const regx = /#\d+/ // find a hash followed by at least one digit

    let newId = regx.exec(line) ? regx.exec(line)[0] : false;

    // see if actually found an ID, if not use the one supplied
    if (!newId) { newId = id };

    // check to see if we already have this guard
    if (!guards[newId]) {
        guards[newId] = { times: [] };
    }

    // push the data to the guard array // but not the lines with _guard_ in them
    if (!regx.test(line)) {
        guards[newId].times.push(line);
    };
    return newId;
}

function processTimes(obj) {

    let maxTime = maxId = 0

    // process the guards data
    Object.keys(obj).forEach(function (key) {

        // console.log(key, guards[key]);
        obj[key].totalTime = 0;
        obj[key].sleepyTimes = []; // an array to hold a count of all the minutes asleep

        // need to step through in pairs
        for (let index = 0; index < obj[key].times.length; index += 2) {
            const sleep = parseInt(getTime(obj[key].times[index]))
            const awake = parseInt(getTime(obj[key].times[index + 1]));

            // console.log(getTime(awake) - getTime(sleep));
            let time = awake - sleep;
            obj[key].totalTime += time;

            // add the sleepey minutes - only need the last two digits
            for (let i = sleep; i < awake; i++) {
                obj[key].sleepyTimes[i] ? obj[key].sleepyTimes[i] += 1 : 1
            }
        }

        if (obj[key].totalTime > maxTime) {
            maxTime = obj[key].totalTime
            maxId = key;
        }


    });
    return maxId;
}
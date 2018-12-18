const readFile = require('./readFile');

//* create a blank array the size of the fabric
const fabric = createFabric(1000);

readFile('./data_5.txt').then(lines => {
    //* loop through the data, 
    for (let index = 0; index < lines.length; index++) {
        let coorordinates = getCoordinates(lines[index]);

        // loop through each ROW of the claim
        for (let row = 0; row < coorordinates.height; row++) {

            // loop through each cell
            for (let cell = 0; cell < coorordinates.width; cell++) {
                // increment the count
                fabric[coorordinates.top + row][coorordinates.left + cell] += 1;
            }
        }
    }

    console.log(countDuplicates(fabric));

});


// split claim into parts - return the coordinates
// #1 @ 126,902: 29x28
function getCoordinates(claim) {

    // replace the spaces and remove the ID
    let data = claim.replace(/\s/g, "").split('@')[1].split(':')

    // get the data we want
    return {
        left: parseInt(data[0].split(',')[0]),
        top: parseInt(data[0].split(',')[1]),
        width: parseInt(data[1].split('x')[0]),
        height: parseInt(data[1].split('x')[1])
    };
}

// create the fabric array
function createFabric(width, height) {
    // check to see if we have a height (not needed for this puzzle)
    if (!height) { height = width };

    // return an array

    return Array(height).fill(0).map(() => Array(width).fill(0))
}

// loop through each cell in the array, 
// anything greater than 1 is a duplicate
function countDuplicates(multiArray) {
    let count = 0;
    multiArray.forEach(element => {
        element.forEach(square => {
            if (square > 1) {
                count++;
            }
        });
    });
    return count;
}
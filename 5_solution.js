const readFile = require('./readFile');

//* create a blank array the size of the fabric
const fabric = createFabric(999);

readFile('./data_5.txt').then(lines => {
    //* loop through the data, 
    for (let index = 0; index < lines.length; index++) {
        let coorordinates =  getCoordinates(lines[index]);
        
        // loop through each ROW of the claim
        for (let row = 0; row < coorordinates.height; row++) {

            // loop through each cell
            for (let cell = 0; cell < coorordinates.width; cell++) {
            
                fabric[coorordinates.top][parseInt(coorordinates.left,10)+parseInt(cell,10)] +=1;
    
            }
           
        }
        // populate the array
        // increment each time so
     
        //* loop through each line of the array
        // loop through each cell
        // keep a count of any greater than 1 
    }

    
});

// split claim into parts - return the coordinates
// #1 @ 126,902: 29x28
function getCoordinates(claim) {
    
    // replace the spaces and remove the ID
    let data = claim.replace(/\s/g, "").split('@')[1].split(':')
    
    // get the data we want
    return {
        left : data[0].split(',')[0],
        top : data[0].split(',')[1],
        width : data[1].split('x')[0],
        height : data[1].split('x')[1]
    };
}

// create the fabric array
function createFabric(width, height) {
    // check to see if we have a height (not needed for this puzzle)
    if (!height) { height = width };

    // return an array

   return Array(height).fill(0).map(() => Array(width).fill(0))
}
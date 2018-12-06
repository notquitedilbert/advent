// reads a file, returns an Promise/array of all the lines
// in the file.

const fs = require('fs');
const readline = require('readline');


module.exports = function (filename) {

    return new Promise((resolve, reject) => {
        const array = []
        let rl = readline.createInterface({
            input: fs.createReadStream(filename)
        });
        rl.on('line', line => {
            array.push(line)
        });
        rl.on('close', ()=>{
            return resolve(array)
        })
    })
};

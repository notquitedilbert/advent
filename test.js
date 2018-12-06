

var readTest = require('./readFile')


let data = readTest('./data_3.js').then(lines => {
    
    console.log(lines.length)
});

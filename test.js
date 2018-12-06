

var readTest = require('./readFile')


let data = readTest('./3_data.js').then(lines => {
    
    console.log(lines.length)
});

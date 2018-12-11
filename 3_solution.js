const readFile = require('./readFile');



let data = readFile('./3_data.js').then(lines => {
    let test = []
    lines.forEach(line =>{
      test.push(count(convertLineToObj(line) ))  ;
    });
    
    let result = total(test)
   console.log(result, result[0]*result[1]);
   
});

// converts the line/string to an object, keeping a count of each character
// line is a string
// returns a hash object
function convertLineToObj(line){
    let data = {};

    line.split('').forEach(letter => {
        if( data[letter]){
            data[letter]= data[letter] +1;
        }else{
            data[letter]=1;
        };
    });
    return data;
}

// checks the keys of the object to see if the value is
// either 2 or/and 3, and return the count
// data - the object to count the repeats
// returns an array (i think)
function count(data){

    let result = [0,0]
    for (const letter in data) {
        if (data.hasOwnProperty (letter)) {
            const element = data[letter];
            // count the number or letters in twice
            if(data[letter]===2){
                result[0]=1
            };
            // count the number of letter in three times
            if(data[letter]===3){
                result[1]=1
            };

        }
    }
    return result
}

// total the data
// data - the arry to add
// returns result of adding the two arrays, and multiplying them together
function total(data){

    let total =[0,0]
    // console.log(data)

    data.forEach(item =>{
        total[0] += item[0]
        total[1] += item[1]
    })

    // let test =  data.reduce((total,item) =>{
    //     console.log(total,item,'before')
    //     total[0] += item[0]
    //     total[1] += item[1]
    //     console.log(total,item,'after')
    // });
 return total;
}

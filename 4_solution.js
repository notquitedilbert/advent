const readFile = require('./readFile');

    readFile('./data_3.js').then(lines => {

        // loop through each line (except the last one)
        const max = lines.length;
        for (let indexOuter = 0; indexOuter < max-1; indexOuter++) {
            const line = lines[indexOuter];
            
            //inner loop
            for (let indexInner = indexOuter+1; indexInner < max; indexInner++) {
                    
                // get the next line
                let nextLine = lines[indexInner];
                
               let check = checkLetters(line,nextLine)
                if(check){
                    // write out the checks that pass
                    console.log(line,nextLine)
                };   
            }
        }
    });


function checkLetters(line1,line2){

    let missmatchCount =0;
    let index=0;
    // assume that the lines are the same length

    while (missmatchCount <2 && index < line1.length) {
        if (line1[index] !== line2[index]) {
            missmatchCount ++;
        }
        index ++;
    }

   // console.log(line1,line2,missmatchCount)
    return missmatchCount <2 ?true:false;
}

//! the answer - 
// tjxmoewpdkyaihvrndgfluwbzc 
// tjxmoewpdkyaihvrndwfluwbzc
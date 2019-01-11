const readFile = require('./readFile');
// there's only going to be 1 (long) line
readFile('./input_day5.txt').then(lines => {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

    txt = lines[0];

    do {
        origlen = txt.length;
        alphabet.forEach(letter => {
            const regex = new RegExp(letter + letter.toUpperCase() + '|' + letter.toUpperCase() + letter, 'g')
            txt = txt.replace(regex, '')
        });

    } while (txt.length < origlen)

    console.log(txt.length)
})
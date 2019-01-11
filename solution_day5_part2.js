const readFile = require('./readFile');
// there's only going to be 1 (long) line
readFile('./input_day5.txt').then(lines => {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

    txt = lines[0];

    let check = ''
    do {
        check = alphabet.shift()
        txt = lines[0].replace(new RegExp(check + '|' + check.toUpperCase(), 'g'), '')

        do {
            origlen = txt.length;
            alphabet.forEach(letter => {
                const regex = new RegExp(letter + letter.toUpperCase() + '|' + letter.toUpperCase() + letter, 'g')
                txt = txt.replace(regex, '')
            });

        } while (txt.length < origlen)
        console.log(txt.length)

        alphabet.push(check)
    } while (check != 'z');

    console.log(txt.length)
})
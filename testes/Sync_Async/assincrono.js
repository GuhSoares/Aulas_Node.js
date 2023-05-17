const fs = require('fs')

console.log('before')

fs.writeFile('arquivo.txt', 'Hello World!', (err) => {
    setTimeout(function () {
        console.log('arquivo escrito')
    }, (1000))
})

console.log('after')
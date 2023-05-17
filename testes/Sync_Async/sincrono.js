const fs = require('fs')

console.log('before')

fs.writeFileSync('arquivo.txt', 'Hello World!')

console.log('after')
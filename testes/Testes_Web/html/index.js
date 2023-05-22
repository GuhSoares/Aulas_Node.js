const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Olá mundo, esse é meu teste</h1><p>esse é um teste de paragrafo</p>')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
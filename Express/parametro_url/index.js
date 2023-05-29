const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const chechAuth = function (req, res, next) {

    req.authStatus = true

    if (req.authStatus) {
        console.log('Usuário autenticado')
        next()
    } else {
        console.log('Usuário não autenticado, faça login para continuar')
        next()
    }
}

app.use(chechAuth)

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`O id do usuário é ${id}`)

    res.sendFile(path.join(basePath, 'users.html'))


})

app.get('/', (req, res) => {

    res.sendFile(path.join(basePath, 'index.html'))


})

app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`)

})

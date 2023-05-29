const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const users = require('./users')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())


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

const basePath = path.join(__dirname, 'templates')

app.use('/users', users)

app.get('/', (req, res) => {

    res.sendFile(path.join(basePath, 'index.html'))


})

app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`)

})

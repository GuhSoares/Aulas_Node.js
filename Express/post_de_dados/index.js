const express = require('express')
const app = express()
const port = 3000

const path = require('path')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

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

app.get('/add', (req, res) => {
    res.sendFile(path.join(basePath, 'userform.html'))

})

app.post('/users/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e a idade é ${age}`)

    res.sendFile(path.join(basePath, 'userform.html'))
})

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

app.get('/add', (req, res) => {
    res.sendFile(path.join(basePath, 'userform.html'))

})

app.post('users/save', (req, res) => {
    res.send('Usuário salvo com sucesso!')
})

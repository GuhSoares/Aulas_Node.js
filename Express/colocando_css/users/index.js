const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')


router.get('/add', (req, res) => {
    res.sendFile(path.join(basePath, '/userform.html'))

})

router.post('/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e a idade é ${age}`)

    res.sendFile(path.join(basePath, 'userform.html'))
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    console.log(`O id do usuário é ${id}`)

    res.sendFile(path.join(basePath, 'users.html'))


})

module.exports = router
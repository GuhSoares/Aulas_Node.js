const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/sobre', (req, res) => {
    res.sendFile(path.join(basePath, '/sobre.html'))
})

router.get('/', (req, res) => {
    res.sendFile(path.join(basePath, '/index.html'))
})

module.exports = router
const express = require('express')
const app = express()
const port = 5000

const projectsRoutes = require('./Projects')

app.use(express.static('public'))

app.use('/projects', projectsRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/sobre', (req, res) => {
    res.sendFile(__dirname + '/templates/sobre.html')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)

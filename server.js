const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = bcrypt.genSalt(10)
    }
    const user = { name: req.body.name, password: req.body.password }
    users.push(user)
    res.status(201).send()
})

app.listen(3000)
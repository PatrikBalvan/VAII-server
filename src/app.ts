import express from 'express'

const app = express()

app.listen(5000, () => {
    console.log('server started')
})

app.get('/api', (req, res) => {
    console.log('api request!')
    res.json({"users" : ['two', 'three', 'four']})
})
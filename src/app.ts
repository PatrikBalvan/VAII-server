import express from 'express'
import mongoose from 'mongoose'
import Article from './models/article.ts'

const dbURI = 'mongodb://localhost:27017/VAII'

const app = express()
mongoose.connect(dbURI)
    .then(() => {
        console.log('connected to db')
        app.listen(5000, () => {
            console.log('server started')
        })
    })
    .catch((err) => {
        console.error(err)
    })

app.get('/get_blog', (req, res) => {
    console.log('get')
    Article.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

app.get('/save_blog', (req, res) => {
    const article = new Article({
        title: 'Title1',
        content: "content1"
    })

    article.save()
        .then(() => {
            console.log('saved')
        })
        .catch((err) => {
            console.error(err)
        })
})
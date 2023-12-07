import express from 'express'
import mongoose from 'mongoose'
import Article from './models/article.ts'

const dbURI = 'mongodb://localhost:27017/VAII'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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

app.get('/get_blogs', (req, res) => {
    Article.find().sort({ _id: -1 }).limit(5)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

app.put('/get_blog_by_id', (req, res) => {
    Article.find({ _id: req.body.id })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

app.post('/save_blog', (req, res) => {
    const Art = new Article({
        title: req.body.title,
        content: req.body.content,
        _id: new mongoose.Types.ObjectId()
    })

    Art.save().then((result) => {
        res.status(201)
    }).catch((err) => {
        res.status(500)
        console.error(err)
    })
    res.send()
})

app.post('/update_blog', (req, res) => {
    Article.findOneAndUpdate({ _id: req.body.id }, {
        title: req.body.title,
        content: req.body.content
    }).then((result) => {
        res.status(201)
    }).catch((err) => {
        res.status(500)
        console.error(err)
    })
    res.send()
})

app.delete('/del_blog', (req, res) => {
    Article.findOneAndDelete({_id: req.body.id})
        .then(() => {
            res.status(200)
        })
        .catch((err) => {
            res.status(500)
            console.error(err)
        })
    res.send()
})
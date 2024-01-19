import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './router'


const PORT: number = 7000
const dbURL: string = 'mongodb://localhost:27017/VAII'

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

mongoose.Promise = Promise
mongoose.connect(dbURL)
mongoose.connection.on('error', (error: Error) => { console.error(error) })

app.use('/', router())
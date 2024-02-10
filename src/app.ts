import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './router'


dotenv.config()

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`)
})

mongoose.Promise = Promise
mongoose.connect(process.env.dbURL)
mongoose.connection.on('error', (error: Error) => { console.error(error) })

app.use('/', router())
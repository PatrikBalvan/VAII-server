import express from 'express'

import authentication from './authentication'
import users from './users'
import articles from './articles'

const router = express.Router()

export default(): express.Router => {
    authentication(router)
    users(router)
    articles(router)

    return router
}
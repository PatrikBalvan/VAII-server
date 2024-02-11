import express from 'express'

import authentication from './authentication'
import users from './users'
import articles from './articles'
import likes from './likes'
import comments from './comments'

const router = express.Router()

export default(): express.Router => {
    authentication(router)
    users(router)
    articles(router)
    likes(router)
    comments(router)

    return router
}
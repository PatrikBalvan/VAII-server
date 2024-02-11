import express from 'express'

import { login, register } from '../controllers/authentication'
import { addComment, getComments } from 'controllers/comments'
import { isAuthorized } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.post('/comment', isAuthorized, addComment)
    router.get('/comments/:articleId', getComments)
}
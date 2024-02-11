import express from 'express'

import { login, register } from '../controllers/authentication'
import { addComment, deleteComment, getComments } from 'controllers/comments'
import { isAuthorized, isEditor } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.post('/comment', isAuthorized, addComment)
    router.get('/comments/:articleId', getComments)
    router.delete('/comment/:commentId', isAuthorized, isEditor, deleteComment)
}
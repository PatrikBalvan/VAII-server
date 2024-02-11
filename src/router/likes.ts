import { delLike, newLike } from 'controllers/likes'
import express from 'express'
import { isAuthorized } from 'middlewares/authorization'


export default (router: express.Router) => {
    router.post('/like', isAuthorized, newLike)
    router.delete('/like', isAuthorized, delLike)
}
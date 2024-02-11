import { delLike, getArticleLikes, getLike, getUserLikes, newLike } from 'controllers/likes'
import express from 'express'
import { isAuthorized } from 'middlewares/authorization'


export default (router: express.Router) => {
    router.get('/articleLikes/:articleId', getArticleLikes)
    router.get('/userLikes/:userId', isAuthorized, getUserLikes)
    router.get('/like', isAuthorized, getLike)
    router.post('/like', isAuthorized, newLike)
    router.delete('/like', isAuthorized, delLike)
}
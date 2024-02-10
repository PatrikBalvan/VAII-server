import { getAllArticles, getArticlesForUser, newArticle } from 'controllers/articles'
import express from 'express'
import { isAuthorized } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.post('/articles', isAuthorized, newArticle)
    router.get('/articles', getAllArticles)
    router.get('/usersArticles/:authorId', isAuthorized, getArticlesForUser)
}
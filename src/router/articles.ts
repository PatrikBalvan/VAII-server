import { getAllArticles, getArticleWithId, getArticlesForUser, newArticle, updateArticle } from 'controllers/articles'
import express from 'express'
import { isAuthorized, isEditor } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.post('/articles', isAuthorized, isEditor, newArticle)
    router.get('/articles', getAllArticles)
    router.get('/article/:articleId', getArticleWithId)
    router.patch('/article/:articleId', isAuthorized, isEditor, updateArticle)
    router.get('/usersArticles/:authorId', isAuthorized, getArticlesForUser)
}
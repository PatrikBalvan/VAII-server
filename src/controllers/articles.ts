import express from 'express'
import { Request } from 'interfaces/declarations'
import { deleteUserById, getUserByEmail, getUserById, getUsers } from 'models/users'
import z from 'zod'
import bcrypt from 'bcrypt'
import { articleModel, createArticle, getArticleById, getArticles, getUsersArticles } from 'models/articles'

export const newArticle = async (req: Request, res: express.Response) => {
    try {
        const {title, body} = req.body

        if(!title || !body) {
            throw new Error('Nevyplnené jedno z povinnych poli!')
        }

        const article = await createArticle({
            title,
            body,
            authorId: req.user
        })

        return res.status(200).json(article)
    } catch (error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getArticlesForUser = async (req: Request, res: express.Response) => {
    try {
        const {authorId} = req.params

        if(!authorId) {
            throw new Error('Nevyplnené jedno z povinnych poli!')
        }

        const articles = await getUsersArticles(authorId)

        return res.status(200).json(articles)
    } catch (error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getAllArticles = async (req: Request, res: express.Response) => {
    try {
        const { page, articlesPerPage } = req.query
        const articles = await getArticles()
        const low = (+page - 1) * +articlesPerPage
        const high = +page * +articlesPerPage
        const resultArticles = articles.slice(low, high)

        return res.status(200).json(resultArticles)
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}

export const getArticleWithId = async (req: Request, res: express.Response) => {
    try {
        const {articleId} = req.params

        const article = await getArticleById(articleId)

        return res.status(200).json(article)
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}

export const updateArticle = async (req: Request, res: express.Response) => {
    try {
        const {articleId} = req.params
        const {title, body} = req.body

        const article = await getArticleById(articleId)
        article.title = title
        article.body = body
        article.save()

        return res.status(200).json(article)
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}
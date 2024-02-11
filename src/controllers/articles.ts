import express from 'express'
import { Request } from 'interfaces/declarations'
import { deleteUserById, getUserByEmail, getUserById, getUsers } from 'models/users'
import z from 'zod'
import bcrypt from 'bcrypt'
import { articleModel, createArticle, getArticleById, getArticles, getUsersArticles } from 'models/articles'

export const newArticle = async (req: Request, res: express.Response) => {
    try {
        const {title, body, authorId} = req.body

        if(!title || !body || !authorId) {
            throw new Error('Nevyplnené jedno z povinnych poli!')
        }

        const article = await createArticle({
            title,
            body,
            authorId
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
        const page = req.query.page
        const articles = await getArticles()
        const low = (+page - 1) * 5
        const high = +page * 5
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
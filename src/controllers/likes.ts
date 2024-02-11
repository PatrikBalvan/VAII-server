import express from "express"
import { Request } from 'interfaces/declarations'
import { getArticleById, getArticlesById } from "models/articles"
import { createLike, deleteLike, getArticleLikesById, getExistingLike, getLikeById, getUsersLikesById } from "models/like"
import { getUserById } from "models/users"

export const newLike = async (req: Request, res: express.Response) => {
    try {
        const { articleId, userId } = req.body

        const existingBlog = await getArticleById(articleId)
        if(!existingBlog) {
            throw new Error('Blog neexistuje')
        }

        const existingUser = await getUserById(userId)
        if(!existingUser) {
            throw new Error('User neexistuje')
        }

        if(req.user !== userId) {
            throw new Error('Nemozes likovat v mene ineho')
        }

        const existingLike = await getExistingLike(articleId, userId)

        if(existingLike && existingLike.length > 0) {
            throw new Error('Nemozes likenut ten isty artikel viacero krat')
        }

        const like = await createLike({
            articleId,
            userId
        })

        return res.sendStatus(200)
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const delLike = async (req: Request, res: express.Response) => {
    try {
        const { articleId, userId } = req.query

        const existingLike = await getExistingLike(articleId as string, userId as string)

        if(existingLike.length === 0) {
            throw new Error('Like neexistuje')
        }

        if(userId !== req.user) {
            throw new Error('Nemožeš mazať like ineho')
        }

        await deleteLike(existingLike[0]._id.toString())

        return res.sendStatus(200)
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getArticleLikes = async (req: Request, res: express.Response) => {
    try {
        const { articleId } = req.params

        const existingArticle = await getArticleById(articleId)

        if(!existingArticle) {
            throw new Error('Artikel neexistuje')
        }

        const likes = await getArticleLikesById(articleId)

        return res.status(200).json({likes: likes.length})
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getUserLikes = async (req: Request, res: express.Response) => {
    try {
        const { userId } = req.params
        const page = req.query.page
        
        if(userId !== req.user) {
            throw new Error('Možeš len svoje liky ziskať!')
        }

        const articleIds: string[] = []

        const existingLikes = await getUsersLikesById(userId)
        existingLikes.forEach((art) => {
            articleIds.push(art.articleId)
        })

        const likedArticles = await getArticlesById(articleIds)

        const low = (+page - 1) * 5
        const high = +page * 5
        const resultArticles = likedArticles.slice(low, high)

        return res.status(200).json(resultArticles)
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getLike = async (req: Request, res: express.Response) => {
    try {
        const { articleId, userId } = req.query

        const existingArticle = await getArticleById(articleId as string)

        if(!existingArticle) {
            throw new Error('Artikel neexistuje')
        }

        const existingUser = await getUserById(userId as string)
        
        if(!existingUser) {
            throw new Error('Uživatel neexistuje')
        }

        if(req.user !== userId) {
            throw new Error('Nemozes ziskat like ineho')
        }

        const like = await getExistingLike(articleId as string, userId)

        return res.status(200).json({likes: like.length})
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}
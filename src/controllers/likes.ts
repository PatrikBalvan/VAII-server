import express from "express"
import { Request } from 'interfaces/declarations'
import { getArticleById } from "models/articles"
import { createLike, deleteLike, getExistingLike, getLikeById } from "models/like"
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
        const { articleId, userId } = req.body

        const existingLike = await getExistingLike(articleId, userId)

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
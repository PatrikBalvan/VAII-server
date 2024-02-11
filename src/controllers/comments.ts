import express from "express"
import { Request } from 'interfaces/declarations'
import { getArticleById } from "models/articles"
import { createComment, getArticleComments } from "models/comments"
import { getUserById } from "models/users"

export const addComment = async (req: Request, res: express.Response) => {
    try {
        const { articleId, userId, body } = req.body

        const existingBlog = await getArticleById(articleId)
        if(!existingBlog) {
            throw new Error('Artikel neexistuje')
        }

        const existingUser = await getUserById(userId)
        if(!existingUser) {
            throw new Error('User neexistuje')
        }

        if(req.user !== userId) {
            throw new Error('Nemozes komentovať v mene ineho')
        }



        const comment = await createComment({
            articleId,
            userId,
            body
        })

        return res.sendStatus(200)
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}

export const getComments = async (req: Request, res: express.Response) => {
    try {
        const { articleId } = req.params

        const comments = await getArticleComments(articleId)

        const coms: any[] = []

        for(let com of comments) {
            let user = await getUserById(com.userId)
            coms.push({
                _id: com._id,
                username: user.username,
                body: com.body,
                createdAt: new Date(com.createdAt).toLocaleDateString()
            })
        }

        return res.status(200).json(coms)
    } catch (error) {
        //console.error(error)
        res.status(400).json({message: error.message})
    }
}
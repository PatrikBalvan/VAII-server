import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserById, userModel } from 'models/users'
import { Request } from 'interfaces/declarations'

export const isAuthorized = async (req: Request, res: express.Response, next: express.NextFunction) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET) as JwtPayload
        const usr = await userModel.findById(_id).select('_id')
        req.user = await usr._id.toString()
        next()

    } catch(err) {
        res.sendStatus(401)
    }
}

export const isOwner = async (req: Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        
        if(id !== req.user) {
            return res.sendStatus(401)
        }

        next()
    } catch(error) {
        console.error(error)
        return res.sendStatus(401)
    }
}

export const isEditor = async (req: Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = req.user
        const user = await getUserById(userId)

        if(user.role !== 'Editor') {
            throw new Error('Not editor')
        }

        next()
    } catch(error) {
        console.error(error)
        return res.sendStatus(401)
    }
}

export const isAdmin = async (req: Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = req.user
        const user = await getUserById(userId)

        if(user.role !== 'Admin') {
            throw new Error('Not admin')
        }

        next()
    } catch(error) {
        console.error(error)
        return res.sendStatus(401)
    }
}
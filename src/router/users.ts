import express from 'express'
import { getUserInfo, updateUser } from 'controllers/users'
import { isAuthorized, isOwner } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.patch('/users/:id', isAuthorized, isOwner, updateUser)
    router.get('/users/:id', getUserInfo)
}
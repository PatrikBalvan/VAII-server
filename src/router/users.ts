import express from 'express'
import { continueFunc, getUserInfo, makeUserAdmin, makeUserEditor, removeUserAdmin, removeUserEditor, updateUser } from 'controllers/users'
import { isAdmin, isAuthorized, isEditor, isOwner } from 'middlewares/authorization'

export default (router: express.Router) => {
    router.patch('/makeUserEditor/:id', isAuthorized, isAdmin, makeUserEditor)
    router.patch('/removeUserEditor/:id', isAuthorized, isAdmin, removeUserEditor)
    router.patch('/makeUserAdmin/:id', isAuthorized, isAdmin, makeUserAdmin)
    router.patch('/removeUserAdmin/:id', isAuthorized, isAdmin, removeUserAdmin)
    router.patch('/users/:id', isAuthorized, isOwner, updateUser)
    router.get('/users/:id', getUserInfo)
    router.get('/users/isAdmin/:id', isAuthorized, isAdmin, continueFunc)
    router.get('/users/isEditor/:id', isAuthorized, isEditor, continueFunc)
}
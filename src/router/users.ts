import express from 'express'
import { continueFunc, getAllAdmins, getAllEditors, getAllUsers, getUserInfo, makeUserAdmin, makeUserEditor, removeUserAdmin, removeUserEditor, updateUser } from 'controllers/users'
import { isAdmin, isAuthorized, isEditor, isOwner } from 'middlewares/authorization'
import { verify } from 'crypto'

export default (router: express.Router) => {
    router.patch('/users/:id', isAuthorized, isOwner, updateUser)
    router.patch('/users/makeUserEditor/:email', isAuthorized, isAdmin, makeUserEditor)
    router.patch('/users/removeUserEditor/:id', isAuthorized, isAdmin, removeUserEditor)
    router.patch('/users/makeUserAdmin/:email', isAuthorized, isAdmin, makeUserAdmin)
    router.patch('/users/removeUserAdmin/:id', isAuthorized, isAdmin, removeUserAdmin)
    router.get('/users/:id', getUserInfo)
    router.get('/users', isAuthorized, isAdmin, getAllUsers)
    router.get('/usersRole/admins', isAuthorized, isAdmin, getAllAdmins)
    router.get('/usersRole/editors', isAuthorized, isAdmin, getAllEditors)
    router.get('/users/isAdmin/:id', isAuthorized, isAdmin, continueFunc)
    router.get('/users/isEditor/:id', isAuthorized, isEditor, continueFunc)
}
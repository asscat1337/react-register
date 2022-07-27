import {Router} from "express";
import UserController from '../controller/user.controller'



const userRouter:Router = Router()

userRouter.post('/login',UserController.login)
userRouter.post('/register',UserController.register)
userRouter.get('/logout',UserController.logout)
userRouter.get('/refresh',UserController.refresh)


export {
    userRouter
}
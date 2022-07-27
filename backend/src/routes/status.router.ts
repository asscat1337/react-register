import {Router} from "express";
import StatusController from '../controller/service.controller'


const statusRouter:Router = Router()


statusRouter.post('/create',StatusController.create)
statusRouter.get('/get',StatusController.get)


export {
    statusRouter
}
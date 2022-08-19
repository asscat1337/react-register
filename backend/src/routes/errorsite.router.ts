import {Router} from "express";
import {protectRoute} from "../middleware/protected";
import ErrorSiteController from '../controller/ErrorSite.controller'


const ErrorSiteRouter:Router=Router()


ErrorSiteRouter.post('/create',ErrorSiteController.create)
ErrorSiteRouter.get('/get',ErrorSiteController.get)
ErrorSiteRouter.put('/update',ErrorSiteController.update)
ErrorSiteRouter.delete('/delete',ErrorSiteController.deleteData)
ErrorSiteRouter.get('/search',ErrorSiteController.search)
ErrorSiteRouter.put('/close-error',ErrorSiteController.closeError)


export {
    ErrorSiteRouter
}
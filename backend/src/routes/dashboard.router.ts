import {Router} from "express";
import DashboardController from '../controller/dashboard.controller'


const dashboardRouter:Router = Router()


dashboardRouter.get('/get',DashboardController.get)
dashboardRouter.post('/create',DashboardController.create)
dashboardRouter.delete('/delete',DashboardController.delete)
dashboardRouter.put('/update',DashboardController.update)
dashboardRouter.get('/find',DashboardController.find)
dashboardRouter.get('/filter',DashboardController.filter)
dashboardRouter.get('/reset',DashboardController.reset)
dashboardRouter.get('/get-users',DashboardController.getUsers)


export {
    dashboardRouter
}
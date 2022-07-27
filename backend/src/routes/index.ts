import {userRouter} from "./user.router";
import {dashboardRouter} from "./dashboard.router";
import {statusRouter} from "./status.router";
import {ErrorSiteRouter} from './errorsite.router'
import {Router} from 'express'


const router:Router = Router()


router.use('/user',userRouter)
router.use('/dashboard',dashboardRouter)
router.use('/status',statusRouter)
router.use('/errorSite',ErrorSiteRouter)

export  {
  router
}
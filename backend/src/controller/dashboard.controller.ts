import {NextFunction, Request,Response} from "express";
import {
    create,
    get,
    deleteData,
    update,
    find,
    filter,
    reset,
    close
} from '../service/dashboard.service'
import {getUser} from "../service/ErrorSite.service";



class DashboardController {
    async get(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {page,limit} = req.query
            const data = await get({page,limit})
            return res.status(200).json(data)
        }catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async create(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = req.body
            const newData = await create(data)
            return res.status(200).json({newData,message:'Запись добавлена'})
        }catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async delete(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try {
            const {payload} = req.body
            const deleted = await deleteData(payload)

            return res.status(200).json({message:"Запись удалена"})
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
    async update(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try {
            const data = await update(req.body)
            return res.status(200).json({updateData:data,message:'Запись обновлена'})
        }catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async find(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {query} = req.query
            const search = query as string

            const data  = await find(search)

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async filter(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await filter(req.query)

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async reset(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await reset()

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async getUsers(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await getUser()

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async closeRequest(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {request_id} = req.body

            const data = await close(request_id as number)

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new DashboardController()
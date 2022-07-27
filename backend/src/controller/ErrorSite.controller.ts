import {create,deleteData,update,get,search} from "../service/ErrorSite.service";
import {NextFunction, Request, Response} from "express";



class ErrorSiteController{
    async create(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const newData = await create(req.body)

            return res.status(200).json(newData)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async get(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {page,limit} = req.query
            const data = await get({page,limit})
            console.log(data)

            return res.status(200).json(data)
        }catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async deleteData(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {payload} = req.body
            const deleted = await deleteData(payload)

            return res.status(200).json(deleted)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async update(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await update(req.body)
            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async search(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {id} = req.query
            const data = await search(id as string)

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new ErrorSiteController()
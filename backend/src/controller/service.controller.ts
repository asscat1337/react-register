import {Request,Response,NextFunction} from "express";
import {get,create} from "../service/status.service";

class StatusController {
    async create(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const {title} = req.body

            const newData = await create(title)

            return res.status(200).json(newData)
        }catch (e) {
            return res.status(500).json(e)
        }
    }

    async get(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await get()

            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new StatusController()
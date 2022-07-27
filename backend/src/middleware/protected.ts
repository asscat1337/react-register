import {Response,Request,NextFunction} from "express";
import {validateAccess} from "../service/jsonwebtoken.service";

export const protectRoute = (req:Request,res:Response,next:NextFunction)=>{
    const headers:string | undefined = req.headers.authorization
    const token = headers?.split(' ')[1]

    if(!headers || !token) {
        return res.status(401).json({
            message:"Ошибка авторизации"
        })
    }
    const verify = validateAccess(token)

    if(!verify){
        return res.status(401).json({
            message:'Не валидный токен'
        })
    }

    req.user = verify
    next()

}
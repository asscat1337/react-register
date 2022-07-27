import {register,loginUser} from "../service/user.service";
import {NextFunction, Request,Response} from "express";
import {validateAccess} from "../service/jsonwebtoken.service";



class UserController{
    async register(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            const data = await register(req.body)
            res.cookie('cookie',data.token.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.status(200).json(data)
        }catch (e) {
            console.log(e)
           return res.status(500).json(e)
        }
    }
    async login(req:Request,res:Response,next:NextFunction):Promise<Response>{
        try{
            // const {token} = req.query
            // const validateTokenAccess = validateAccess(token)
            // console.log(validateTokenAccess)
            // if(!validateTokenAccess){
            //     console.log('test')
            //     return res.status(401).json({message:'НЕ ВАЛИДНЫЙ ТОКЕН'})
            // }
            const data = await loginUser(req.body)
            res.cookie('cookie',data.token.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.status(200).json(data)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async logout(req:Request,res:Response,next:NextFunction):Promise<Response>{
        res.clearCookie('token')
        return res.status(200).json({message:'logout'})
    }
    async refresh(req:Request,res:Response,next:NextFunction){
        try{
            const {token} = req.cookies
            console.log(token)
        }catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new UserController()
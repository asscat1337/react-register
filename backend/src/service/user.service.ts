import {User} from '../models/User'
import * as bcrypt from 'bcrypt'
import {generateToken} from "./jsonwebtoken.service";
import {CustomError} from "../error/error";


interface IUser {
    login:string,
    password:string,
    fio:string
}

const register=async(payload:IUser)=>{
    const findUser = await User.findOne({
        where:{
            login:payload.login
        },
        raw:true
    })
    if(findUser){
        throw new Error('такой пользователь уже существует')
    }
    const hashedPassword = await bcrypt.hash(payload.password,3)
    const data = await User.create({
        ...payload,
        password:hashedPassword
    })

    const token = generateToken(data)
    return {
        user:data,
        token
    }
}

const loginUser = async (payload:IUser)=>{
    const {login,password} = payload

    const findUser = await User.findOne({
        where:{
            login
        },
        raw:true
    })
    const decodePassword = await bcrypt.compare(password,findUser?.password as string)
    console.log(decodePassword)
    if (!decodePassword){
        throw new CustomError({auth:false,message:'неверный пароль'})
    }
    if(!findUser){
        throw new CustomError({
            message:'Такого пользователя не существует',
            auth:false
        })
    }
    const {password:pas,...rest} = findUser
    const token = generateToken(rest)

    return {
        user:rest,
        token
    }

}
const refresh=(payload:string)=>{

}


export {
    register,
    loginUser
}
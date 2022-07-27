import * as jsonwebtoken from 'jsonwebtoken'

interface IToken {
    fio?:string,
    login?:string
    user_id?:number,
    password:string
}

type DeletePassword = Omit<IToken, "password">
const generateToken = (payload:DeletePassword)=>{
    const accessToken = jsonwebtoken.sign(payload,process.env.ACCESS_KEY as string,{
        expiresIn:"15min"
    })
    const refreshToken = jsonwebtoken.sign(payload,process.env.SECRET_KEY as string,{
        expiresIn:"30d"
    })

    return {
        accessToken,
        refreshToken
    }
}

const validateRefresh=(payload:any)=>{
    return jsonwebtoken.verify(payload,process.env.SECRET_KEY as string)
}
const validateAccess=(payload:any)=>{
    return jsonwebtoken.verify(payload,process.env.ACCESS_KEY as string)
}



export {
    generateToken,
    validateAccess,
    validateRefresh
}
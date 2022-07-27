import {Sequelize} from "sequelize-typescript";
import {RequestRegister} from "../models/RequestRegister";
import {Status} from "../models/Status";
import {User} from "../models/User";
import {ErrorSite} from "../models/ErrorSite";
const {DB_PASSWORD,DB,DB_USER,DB_HOST} = process.env

const password = DB_PASSWORD as string
const db = DB as string
const user = DB_USER as string
const host = DB_HOST as string


const connection = new Sequelize({
    database:db,
    dialect:"mysql",
    username:user,
    host,
    password,
    models:[RequestRegister,Status,User,ErrorSite]
})

const start = async()=>{
    try{
        await connection.authenticate()
        await connection.sync({alter:true})
    }catch (e) {
        console.log(e)
    }
}

start()

export {
   start
}
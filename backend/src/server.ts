import 'dotenv/config'
import express,{Express,Request,Response} from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {start} from "./core/connection"
import {router} from "./routes";
import helmet from "helmet";
import path from 'path'

const app:Express = express()

app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_ADDRESS,
    credentials:true
}))
app.use(cookieParser())
app.use(express.static(path.resolve('../','build')))

app.use('/api',router)

if(process.env.NODE_ENV === 'production'){
    // app.use(helmet())
    console.log('test')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve('../','build','index.html'))
    })
}


app.listen(process.env.PORT,async()=>{
    console.log(process.env.NODE_ENV,'test')
    console.log(`server started`)
   await start()
})
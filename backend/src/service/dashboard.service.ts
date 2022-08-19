import {RequestRegister} from "../models/RequestRegister";
import {Status} from "../models/Status";
import {Op} from 'sequelize'
import {Dashboard} from "@mui/icons-material";
import dayjs from "dayjs";


const create = async (data: any) => {
    const {statusId} = data

    const newData = await RequestRegister.create({...data,statusId:statusId.id})

    const getNewData = await RequestRegister.findOne({
        where:{
            request_id:newData.request_id
        },
        include:[{
            model:Status
        }]
    })

    return getNewData
}

const get = async (payload:any) => {
    const {limit,page} = payload
    const data = await RequestRegister.findAndCountAll({
        limit:+limit,
        offset:+page * +limit,
        include:[{
            model:Status
        }]
    })

    return data
}

const deleteData = async (payload:any)=>{

    const deleteData = payload.map(async (item:number)=>{
        await RequestRegister.destroy({
            where:{
                request_id:item
            }
        })
    })
     return deleteData
}

const update=async(payload:any)=>{
    const {statusId} = payload
    await RequestRegister.update({...payload,
        statusId:statusId.status_id || statusId.id},{
        where:{
            request_id:payload.request_id
        }
    })

    const updateData = await RequestRegister.findOne({
        where:{
            request_id:payload.request_id
        },
        include:[{
            model:Status
        }]
    })

    return updateData
}
const find = async(payload:string)=>{
    const result = await RequestRegister.findAll({
        where:{
            [Op.or]:[
                {description:{
                        [Op.substring]:payload
                }},
                {numberRequest:{
                        [Op.substring]:payload
                    }},
                {author:{
                        [Op.substring]:payload
                    }}
            ]
        }
    })
    return result
}

const filter=async(payload:any)=>{
    const data = await RequestRegister.findAll({
        where:{
            [Op.or]:payload
        },
        include:[{
            model:Status
        }]
    })

    return data
}

const reset=async ()=>{
    const data = await get({page:0,limit:5})

    return data
}

const close = async(payload:number)=>{
    await RequestRegister.update({
        end_date:dayjs().format('YYYY-MM-DD'),
        statusId:2
    },{
        where:{
            request_id:payload
        }
    })
    const data = await RequestRegister.findByPk(payload)
    return data
}

export {
    create,
    get,
    deleteData,
    update,
    find,
    filter,
    reset,
    close
}
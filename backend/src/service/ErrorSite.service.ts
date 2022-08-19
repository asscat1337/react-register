import {ErrorSite} from "../models/ErrorSite";
import {Op} from 'sequelize'
import dayjs from "dayjs";
import {User} from "../models/User";


const get=async (payload:any)=>{
    const {page,limit} = payload
    console.log(page,limit)
    const data = await ErrorSite.findAndCountAll({
        limit: +limit,
        offset:+page * +limit
    })

    return data
}

const create=async (payload:any)=>{
    const data = await ErrorSite.create({
        ...payload,
        start_time:dayjs(payload.start_time).format('HH:mm:ss')
    })
    return data
}
const deleteData=async (payload:number[])=>{
   const deleteInfo = payload.map(async (item:number)=>{
       await ErrorSite.destroy({
           where:{
               error_id:item
           }
       })
   })
    return deleteInfo
}
const update=async (payload:any)=>{
    const {end_time} = payload
    const updateData = await ErrorSite.update({...payload,end_time:dayjs(end_time).format('HH:mm')},{
        where:{
            error_id:payload.error_id
        }
    })

    const updatedData = await ErrorSite.findByPk(payload.error_id)

    return updatedData
}
const search = async(payload:string)=>{
    const data = await ErrorSite.findAll({
        where:{
            [Op.or]:{
                description:{
                    [Op.substring]:payload
                },
                date:{
                    [Op.substring]:payload
                }
            }
        }
    })
    return data
}

const getUser=async ()=>{
    const data = await User.findAll()

    return data.map(item=>{
        return {
            id:item.user_id,
            label:item.fio
        }
    })
}
const error = async(payload:number)=>{
    await ErrorSite.update({
        end_time:dayjs().format('HH:mm:ss')
    },{
        where:{
            error_id:payload
        }
    })

    const data = await ErrorSite.findByPk(payload)

    return data
}

export {
    create,
    deleteData,
    update,
    get,
    search,
    getUser,
    error
}
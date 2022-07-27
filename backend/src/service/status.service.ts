import {Status} from "../models/Status";

interface IStatus {
    title: string
}


const create = async (payload: IStatus) => {
    const data = await Status.create({
        title: payload
    })

    return data
}

const get = async () => {
    const data = await Status.findAll()
    return data.map(item=>{
        return {
            id:item.status_id,
            label:item.title
        }
    })
}

export {
    create,
    get
}
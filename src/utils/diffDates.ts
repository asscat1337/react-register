import dayjs from "dayjs";




const diffDates=(firstDate:any,lastDate:any)=>{
    const last = dayjs(lastDate)
    const first = dayjs(firstDate)
    return last.diff(first,'day')
}

export {
    diffDates
}
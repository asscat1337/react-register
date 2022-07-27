export type Dashboard = {
    request_id:number;
    description:string;
    start_date:string;
    end_date:string;
    status:any;
    numberRequest:string;
    author:number;
    comment:string,
    statusId:number
}
export type Status = {
    id:number
    label:string
}
export type EditData = Omit<Dashboard, "statusId">

export interface IDashboard  {
    data:Dashboard[],
    status:Status[],
    loading:boolean,
    modalOpen:boolean,
    isEdit:boolean,
    editData:EditData,
    pageSize:number,
    page:number,
    count:number,
    users:any,
    isSuccess:boolean,
    message:string
}
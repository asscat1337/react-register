export type Error = {
    error_id:number,
    description:string,
    date:string,
    start_time:string,
    end_time:string
}


export interface IError{
    errorData:Error[],
    loading:boolean,
    pageError:number,
    pageSizeError:number,
    countError:number,
    isOpen:boolean,
    editData:any,
    isEdit:boolean,
    isError:boolean,
    message:string
}
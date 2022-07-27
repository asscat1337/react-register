import React from "react";

export interface EnhancedTable{
    numSelected:number,
    onSelectAllClick:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    rowCount:number
}
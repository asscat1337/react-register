import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store";

const CreateData = (payload:any)=>{
   const data = React.useMemo(()=>payload,[payload])

    return data
}


export {
    CreateData
}
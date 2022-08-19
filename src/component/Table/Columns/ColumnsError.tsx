import {Column} from "react-table";
import React from "react";
import {minusTime} from "../../../utils/minusTime";
import {Button} from "@mui/material";
import {AppDispatch} from "../../../store";
import {useDispatch} from "react-redux";
import {closeError} from "../../../store/asyncAction/AsyncError";


const ColumnsError=()=>{
    const dispatch:AppDispatch = useDispatch()


    const closeErrorAction=async (payload:any)=>{
        await dispatch(closeError(payload))
    }

    const columns:Column[] = React.useMemo(()=>[
        {
            Header:'Описание',
            accessor:'description'
        },
        {
            Header:'Дата',
            accessor:'date'
        },
        {
            Header:'Время начала',
            accessor: 'start_time'
        },
        {
            Header:'Время окончания',
            accessor: 'end_time'
        },
        {
            Header: 'Длительность',
            accessor: () => null,
            Cell: ({row: {original}}: any) => {
                const startTime = original.start_time
                const endTime = original.end_time
                return <>{endTime ? minusTime(startTime,endTime) : null}</>
            }
        },
        {
            Header:'',
            accessor: 'actions',
            Cell:({row:{original}})=>(
                <Button onClick={()=>closeErrorAction(original)}>
                    Закрыть
                </Button>
            )
        }
    ],[])

    return columns
}

export {
    ColumnsError
}
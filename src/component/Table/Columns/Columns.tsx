import React from "react";
import {Column} from "react-table";
import {diffDates} from "../../../utils/diffDates";
import dayjs from "dayjs";
import {Button} from "@mui/material";
import {AppDispatch} from "../../../store";
import {useDispatch} from "react-redux";
import {closeRequest} from "../../../store/asyncAction/AsyncDashboard";


const Columns=()=>{
    const dispatch:AppDispatch = useDispatch()
    const onCloseRequest=async (payload:any)=>{
       await dispatch(closeRequest(payload))
    }

    const columns: Column[] = React.useMemo(
        () => [
            {
                Header: 'Описание проблемы',
                accessor: 'description',
                width:250
            },
            {
                Header: 'Дата обращения',
                accessor: 'start_date'
            },
            {
                Header: 'Статус обращения',
                accessor: 'status',
                Cell: ({row: {original}}: any) => {
                    return <>{original.status?.title}</>
                }
            },
            {
                Header: 'Номер задачи',
                accessor: 'numberRequest'
            },
            {
                Header: 'Автор',
                accessor: 'author'
            },
            {
                Header: 'Дата окончания',
                accessor: 'end_date'
            },
            {
                Header: 'Дней с момента создания',
                accessor: () => null,
                Cell: ({row: {original}}: any) => {
                    const startDate = original.start_date
                    const endDate = original.end_date
                    return <>{endDate ? diffDates(startDate,endDate) : diffDates(startDate,dayjs().format('YYYY-MM-DD'))}</>
                }
            },
            {
                Header: 'Комментарий',
                accessor: 'comment'
            },
            {
                Header:"",
                accessor: "actions",
                Cell:({row:{original}})=>(
                    <Button onClick={()=>onCloseRequest(original)}>
                        Закрыть
                    </Button>
                )
            }

        ]
        , [])

    return columns
}

export {
    Columns
}
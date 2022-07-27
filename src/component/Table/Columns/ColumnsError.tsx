import {Column} from "react-table";
import React from "react";
import dayjs from "dayjs";
import {minusTime} from "../../../utils/minusTime";


const ColumnsError=()=>{
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
    ],[])

    return columns
}

export {
    ColumnsError
}
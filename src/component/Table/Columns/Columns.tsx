import React from "react";
import {Column} from "react-table";
import {diffDates} from "../../../utils/diffDates";



const Columns=()=>{
    const columns: Column[] = React.useMemo(
        () => [
            {
                Header: 'Описание проблемы',
                accessor: 'description'
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
                    return <>{endDate ? diffDates(startDate,endDate) : ""}</>
                }
            },
            {
                Header: 'Комментарий',
                accessor: 'comment'
            },

        ]
        , [])

    return columns
}

export {
    Columns
}
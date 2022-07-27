import React from "react";
import {
    DatePicker,
    LocalizationProvider
} from "@mui/x-date-pickers";
import {
    Popover,
    IconButton,
    Autocomplete,
    TextField,
    Paper,
    Button
} from "@mui/material";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as ruLocale from 'dayjs/locale/ru'
import {FilterList} from "@mui/icons-material";
import {TableInstance} from "react-table";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {filterData, resetAll} from "../../../store/asyncAction/AsyncDashboard";


interface IFilter{
    instance:TableInstance
}

const Filter:React.FC<IFilter>=({instance})=>{
    const dispatch:AppDispatch = useDispatch()
    const {status} = useSelector((state:RootState)=>state.dashboard)
    const {isOpen} = useSelector((state:RootState)=>state.error)
    const {allColumns,Filter} = instance
    const [anchorEl,setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const statusRef = React.useRef<HTMLInputElement|null>(null)
    const [startDate,setStartDate] = React.useState<Date | null>(null)
    const [endDate,setEndDate] = React.useState<Date | null>(null)
    const open = Boolean(anchorEl)

    const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget)
    }
    const handleClose=()=>{
        setAnchorEl(null)
    }

    const requestDate=async (payload:Date | null)=>{
        await dispatch(filterData({id:dayjs(payload).format('YYYY-MM-DD')}))
    }

    const changeStartDate=async (payload:any)=>{
       setStartDate(payload)

        await requestDate(payload)
    }

    const changeEndData=async (payload:any)=>{
        setEndDate(payload)

        await requestDate(payload)
    }
    const onChangeStatus=async (data:any)=>{
        console.log(data)
        await dispatch(filterData(data))
    }

    const onResetAll=async ()=>{
        const isStatus = statusRef.current?.value
       if(startDate || endDate || isStatus ){
            setAnchorEl(null)
            await dispatch(resetAll())
       }
    }

    const id = open ? 'simple-popover' : undefined

    return (
        <div>
            {!isOpen && (
                <>
                <IconButton onClick={handleClick}>
                    <FilterList/>
                </IconButton>
                <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
            }}
                transformOrigin={{
                vertical:"top",
                horizontal:"right"
            }}
                >
                <Paper elevation={4} sx={{width:'250px',p:2}}>
                <Button onClick={onResetAll}>
                Очистить
                </Button>
                <Autocomplete
                renderInput={(params => (
                <TextField
                inputRef={statusRef}
            {...params}
                label="Статус"
                />
                ))}
                options={status}
                onChange={(event,newValue)=>onChangeStatus(newValue)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale}>
                <DatePicker
                onChange={(newValue)=>changeStartDate(newValue)}
                value={startDate}
                renderInput={(params)=><TextField {...params}/>}
                />
                <DatePicker
                onChange={(newValue)=>changeEndData(newValue)}
                value={endDate}
                renderInput={(params)=><TextField {...params}/>}
                />
                </LocalizationProvider>
                </Paper>
                </Popover>
                </>
            )}
        </div>
    )
}
export {Filter}
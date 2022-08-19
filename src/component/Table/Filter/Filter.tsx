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


interface IFilter {
    instance: TableInstance
}

const Filter: React.FC<IFilter> = () => {
    const dispatch: AppDispatch = useDispatch()
    const {status} = useSelector((state: RootState) => state.dashboard)
    const {isOpen} = useSelector((state: RootState) => state.error)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const statusRef = React.useRef<HTMLInputElement | null>(null)
    const [startDate, setStartDate] = React.useState<Date | null>(null)
    const [endDate, setEndDate] = React.useState<Date | null>(null)
    const [currentStatus,setCurrentStatus] = React.useState<any>({})
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const requestDate = async (payload: Date | null) => {
        await dispatch(filterData({id: dayjs(payload).format('YYYY-MM-DD')}))
    }

    const changeStartDate = (payload: any) => {
        setStartDate(payload)

        // await requestDate(payload)
    }

    const changeEndData =(payload: any) => {
        setEndDate(payload)

    }
    const onChangeStatus = async (data: any) => {
        setCurrentStatus(data)
        // await dispatch(filterData(data))
    }

    const onResetAll = async () => {
        const isStatus = statusRef.current?.value
        if (startDate || endDate || isStatus) {
            setAnchorEl(null)
            await dispatch(resetAll())
        }
    }

    const onFilterData = async () => {
        const startDateObject = startDate ? {start_date:dayjs(startDate).format('YYYY-MM-DD')} : null
        const endDateObject = endDate ? {end_date:dayjs(endDate).format('YYYY-MM-DD')} : null
        const statusObject = currentStatus ? {statusId:currentStatus.id} : null

        const filterObject = {...startDateObject,...endDateObject,...statusObject}

        await dispatch(filterData(filterObject))
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
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <Paper elevation={4} sx={{width: '350px', p: 2}}>
                            <Button onClick={onResetAll}>
                                Очистить
                            </Button>
                            <Autocomplete
                                sx={{p:2}}
                                renderInput={(params => (
                                    <TextField
                                        inputRef={statusRef}
                                        {...params}
                                        label="Статус"
                                    />
                                ))}
                                options={status}
                                onChange={(event, newValue) => onChangeStatus(newValue)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale}>
                                <DatePicker
                                    onChange={(newValue) => changeStartDate(newValue)}
                                    value={startDate}
                                    renderInput={(params) =>
                                        <TextField
                                            sx={{width:'250px',m:2}}
                                            {...params}
                                            label="Дата начала"
                                        />}
                                />
                                <DatePicker
                                    onChange={(newValue) => changeEndData(newValue)}
                                    value={endDate}
                                    renderInput={(params) =>
                                        <TextField
                                            sx={{width:'250px',m:2}}
                                            {...params}
                                            label="Дата окончания"
                                        />}
                                />
                            </LocalizationProvider>

                            <Button onClick={onFilterData}>
                                Применить
                            </Button>
                        </Paper>
                    </Popover>
                </>
            )}
        </div>
    )
}
export {Filter}
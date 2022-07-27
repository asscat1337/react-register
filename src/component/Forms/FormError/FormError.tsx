import React from 'react'
import {TextField,Button,Box,TextFieldProps} from "@mui/material";
import {useForm,Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {DatePicker,LocalizationProvider,TimePicker} from "@mui/x-date-pickers";
import * as ruLocale from 'dayjs/locale/ru'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import styles from './FormError.module.scss'
import {AppDispatch, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {createError, updateError} from "../../../store/asyncAction/AsyncError";
import {toggleModal} from "../../../store/slices/dashboardSlice";
import dayjs from "dayjs";

interface IErrorForm{
    notify:(message:string)=>void
}

const FormError:React.FC<IErrorForm>=({notify})=>{
    const dispatch:AppDispatch = useDispatch()
    const {isEdit,editData} = useSelector((state:RootState)=>state.error)
    const schema = yup.object().shape({
        description:yup.string(),
        start_time:yup.date(),
        end_time:yup.date()
    })
    const {control,handleSubmit,setValue} = useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit=async (data:any)=>{

        /// лютый костыль
        if(isEdit){
            const editObject = {
                ...editData,
                description:isEdit && data.description === undefined ? editData.description : data.description,
                date:editData.date,
                end_time:data.end_time === undefined ? dayjs().format('HH:mm:ss'):data.end_time
            }
            const {payload:{message}}:any = await dispatch(updateError(editObject))
            notify(message)
            dispatch(toggleModal({modalOpen:false}))
            return
        }
        const newError = {
            ...data,
            date: data.date === undefined ? dayjs().format("YYYY-MM-DD") : data.date,
            start_time : data.start_time === undefined ? dayjs().format('HH:mm:ss') : data.start_time
        }
         const {payload:{message}}=await dispatch(createError(newError))
        notify(message)
    }

    return (
        <Box component="form"
             onSubmit={handleSubmit(onSubmit)}
             className={styles.container}
        >
            <Controller
                control={control}
                defaultValue={editData?.description}
                render={({field:{onChange,value}})=>(
                    <TextField
                        onChange={onChange}
                        value={value}
                        label="Описания"
                        rows={5}
                        multiline
                    />
                )}
                name="description"
            />
            <Controller
                control={control}
                defaultValue={isEdit ? editData.date : new Date()}
                render={({field:{onChange,value}})=>(
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        locale={ruLocale}
                    >
                        <DatePicker
                            label="Дата"
                            onChange={(newValue,event)=>onChange(isEdit ? editData.date : newValue)}
                            value={value}
                            renderInput={(params:TextFieldProps)=>(
                                <TextField
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                )}
                name="date"
            />
            {/*<LocalizationProvider*/}
            {/*    dateAdapter={AdapterDayjs}*/}
            {/*    adapterLocale={ruLocale}*/}
            {/*>*/}
            {/*    <TimePicker*/}
            {/*        label="Время начала"*/}
            {/*        onChange={(time)=>setValue('start_time',time)}*/}
            {/*        value={"11:25:00"}*/}
            {/*        renderInput={(params:TextFieldProps)=>(*/}
            {/*            <TextField*/}
            {/*                {...params}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</LocalizationProvider>*/}
                <Controller
                    control={control}
                    defaultValue={dayjs()}
                    render={({field:{onChange,value}})=>{
                        console.log()
                       return <LocalizationProvider
                            adapterLocale={ruLocale}
                            dateAdapter={AdapterDayjs}
                        >
                            <TimePicker
                                value={isEdit ? dayjs(`${editData.date}${editData.start_time}`) : value}
                                onChange={onChange}
                                inputFormat="HH:mm:ss"
                                label="Время начала"
                                renderInput={(params:TextFieldProps)=>(
                                    <TextField
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    }
                    }
                    name="start_time"
                />
            {isEdit && (
                <Controller
                    control={control}
                    defaultValue={(isEdit && editData.end_time) ? dayjs(`${editData.date}${editData.end_time}`) : dayjs()}
                    render={({field:{onChange,value}})=>(
                        <LocalizationProvider
                            adapterLocale={ruLocale}
                            dateAdapter={AdapterDayjs}
                        >
                            <TimePicker
                                onChange={onChange}
                                value={value}
                                inputFormat="HH:mm"
                                label="Время окончания"
                                renderInput={(params:TextFieldProps)=>(
                                    <TextField
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )}
                    name="end_time"
                />
            )}
            <Button type="submit">
                Добавить
            </Button>
        </Box>
    )
}

export {
    FormError
}
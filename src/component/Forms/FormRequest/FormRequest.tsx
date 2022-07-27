import React from "react";
import {
    TextField,
    Button,
    Box,
    Autocomplete
} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import * as ruLocale from 'dayjs/locale/ru'
import {DatePicker} from "@mui/x-date-pickers";
import * as yup from 'yup'
import {useForm,Controller} from "react-hook-form";
import styles from './FormRequest.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {createData,updateData} from "../../../store/asyncAction/AsyncDashboard";
import dayjs from "dayjs";
import {toggleModal} from "../../../store/slices/dashboardSlice";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

interface IFormRequest{
    onSubmit?:any,
    isEdit:boolean,
    notify:(message:string)=>void
}

const FormRequest:React.FC<IFormRequest>=({isEdit,notify})=>{
    const dispatch:AppDispatch = useDispatch()
    const {status,editData,users} = useSelector((state:RootState)=>state.dashboard)
    const {user} = useSelector((state:RootState)=>state.user)


    const schema = yup.object().shape({
        description:yup.string(),
        start_date:yup.date(),
        end_date:yup.date(),
        statusId:yup.object(),
        numberRequest:yup.string(),
        author:yup.string(),
        comment:yup.string()
    })
    const {register,handleSubmit,control,reset} = useForm({
        resolver:yupResolver(schema)
    })
    const onSubmit=async (data:any)=>{
        if(isEdit){
            const transformedData = {
                ...data,
                request_id:editData.request_id,
                start_date:data.start_date ?? editData.start_date,
                end_date:data.end_date === undefined ? dayjs().format('YYYY-MM-DD') : data.end_date,
                statusId:data.statusId === undefined ? editData.status : data.statusId
            }
          const {payload}:any = await dispatch(updateData(transformedData));
          dispatch(toggleModal({modalOpen:false,isEdit:false}))
          notify(payload.message)
           return
        }
       const {payload}:any =  await dispatch(createData({
            ...data,
            author:data.author === undefined ? user.user.fio : data.author,
            start_date: data.start_date === undefined ? dayjs().format('YYYY-MM-DD') : data.start_date
        }));
        notify(payload.message)
        reset()
        dispatch(toggleModal({modalOpen:false,isEdit:false}))
    }


    // @ts-ignore
    return (
        <Box component="form" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Описание проблемы"
                required
                defaultValue={isEdit ? editData?.description : ""}
                {...register('description')}
            />
            <Controller
                control={control}
                name="start_date"
                defaultValue={isEdit ? editData?.start_date: new Date()}
                render={({field:{onChange,value}})=>(
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale}>
                        <DatePicker
                            value={value}
                            label="Дата начала"
                            onChange={(newValue)=>onChange(newValue)}
                            renderInput={(params)=>(
                                <TextField
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                )}
            />
            <Controller
                control={control}
                name="statusId"
                render={({field:{onChange,value}})=>(
                    <Autocomplete
                        options={status}
                        isOptionEqualToValue={(option,value)=>option.label === value}
                        value={editData?.status?.title || value?.title}
                        onChange={(event,newValue)=>onChange(newValue)}
                        renderInput={(params)=>(
                            <TextField
                                {...params}
                                label="Статус"/>
                        )}
                    />
                )}
            />
            {isEdit && (
                <Controller
                    control={control}
                    name="end_date"
                     defaultValue={editData?.end_date ?? new Date()}
                    render={({field:{onChange,value}})=>(
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale}>
                            <DatePicker
                                label="Дата окончания"
                                value={value}
                                onChange={(newValue)=>onChange(newValue)}
                                renderInput={(params)=>(
                                    <TextField
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )}
                />
            )}
            <TextField
                label="Номер задачи РМИАС"
                defaultValue={isEdit ? editData?.numberRequest : ""}
                required
                {...register('numberRequest')}
            />
            <Controller
                control={control}
                render={({field:{onChange,value}})=>(
                    <Autocomplete
                        value={value || user.user.fio}
                        isOptionEqualToValue={(option,value)=>option.label === user.user.fio}
                        onChange={(event,newValue)=>user.user.fio || onChange(newValue.label)}
                        renderInput={(params)=>(
                            <TextField
                                label="Автор"
                                {...params}
                            />
                        )}
                        options={users}/>
                )}
                name="author"
            />
            <TextField
                label="Комментарий"
                multiline
                defaultValue={isEdit ? editData?.comment : ""}
                rows={7}
                {...register('comment')}
            />
            <Button type="submit">
                {isEdit ? "Редактировать" : "Добавить"}
            </Button>
        </Box>
    )
}

export {
    FormRequest
}
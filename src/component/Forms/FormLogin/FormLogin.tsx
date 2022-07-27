import React from "react";
import {
    TextField,
    Button,
    Box,
    styled,
    CssBaseline,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {AppDispatch} from "../../../store";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../store/asyncAction/AsyncUser";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Form = styled(Box)(({theme})=>`
    margin-top:32px auto;
    
`)

const PasswordInput=styled(FormControl)(({theme})=>`
    width:100%
`)

interface IForm {
    notify:(message:string)=>void
}

const FormLogin:React.FC<IForm>=({notify})=>{
    const dispatch:AppDispatch = useDispatch()
    const navigate =  useNavigate()
    const schema = yup.object().shape({
        login:yup.string().required(),
        password:yup.string().required()
    })
    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    })
    const [password,setShowPassword] = React.useState<boolean>(false)

    const handleClickPassword=()=>{
        setShowPassword(!password)
    }

    const onAuthUser=async (data:any)=>{
        const user = await dispatch(loginUser(data))
        if(user.payload.auth !== false){
            console.log(user)
            navigate('/dashboard')
        }else{
            // @ts-ignore
            notify(user.payload?.message)
        }
        
    }

    return (
        <Form component="form" onSubmit={handleSubmit(onAuthUser)}>
            <CssBaseline/>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Логин"
                {...register('login')}
            />
            <PasswordInput variant="filled">
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                    type={password ? "text":"password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={handleClickPassword}
                            >
                                {password ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    {...register('password')}
                />
            </PasswordInput>
            <Button
                type="submit"
                fullWidth
                sx={{mt:3,mb:2}}
            >
                Авторизация
            </Button>
        </Form>
    )
}

export {
    FormLogin
}
import React from "react";
import {
    FormLogin
} from "../../component/Forms/FormLogin/FormLogin";
import {Box, CssBaseline, styled, Avatar, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Main = styled(Box)(({theme})=>`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-flow:wrap column;
    margin-top:64px;
`)


const Login:React.FC=()=>{

    const notify=(message:string)=>{
         toast.error(message)
    }

    return (
        <Main maxWidth="xs">
            <ToastContainer/>
            <CssBaseline/>
            <Avatar sx={{mt:1}}>
                <LockOutlined/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Авторизация
            </Typography>
            <FormLogin
             notify={notify}
            />
        </Main>
    )
}

export default Login
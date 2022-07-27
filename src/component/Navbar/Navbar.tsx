import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Logout, WbSunny,Nightlight} from "@mui/icons-material";
import React from "react";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {logout} from "../../store/asyncAction/AsyncUser";
import {useNavigate} from "react-router-dom";


interface Navbar{
    onChange:any,
    darkTheme:string
}

const Navbar:React.FC<Navbar>=({onChange,darkTheme})=>{
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()


    const logoutUser=async ()=>{
        await dispatch(logout())
            .then(()=>{
                navigate('/login')
            })
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    onClick={onChange}
                    sx={{mr:2}}
                    size="large"
                    edge="start"
                    color="inherit"
                >
                    {darkTheme === "dark" ? <Nightlight/>:<WbSunny/> }
                </IconButton>
                <div>
                    <IconButton
                        sx={{
                            ml:10
                        }}
                        size="large"
                        color="inherit"
                        onClick={logoutUser}
                    >
                        <Logout/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export {
    Navbar
}
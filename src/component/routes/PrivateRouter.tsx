import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {RootState} from "../../store";



interface Private {
    children:React.ReactElement<any,any>
}

const PrivateRouter=({children}:Private):JSX.Element=>{

    const {auth} = useSelector((state:RootState)=>state.user)

    return auth ? children  : <Navigate to="/login" replace={true}
    />
}

export {
    PrivateRouter
}
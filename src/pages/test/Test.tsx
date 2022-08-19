import React from "react";
import {BX24} from "bx24";
import axios from "axios";




const Test=()=>{
    const bx24 = new BX24()
    const getUser=async()=>{
        await bx24.getAuth()
            .then(async (auth)=>{
                console.log(auth)
               const {data}:any = await axios.get(`https://bitrix.gkb13ufa.ru/rest/user.current?auth=${auth.ACCESS_TOKEN}`)
                console.log(data)
            })
    }


    React.useEffect(()=>{
       getUser()
    },[])

    return (
        <div>Тестовая страница</div>
    )
}

export {
    Test
}
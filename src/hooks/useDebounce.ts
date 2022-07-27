import React from "react";



const useDebounce=(initialValue:string)=>{
    const [value,setValue] = React.useState<string>(initialValue)
    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            setValue(initialValue)
        },1000)
        return ()=>{
            clearTimeout(timer)
        }
    },[initialValue])

    return value
}
export {
    useDebounce
}
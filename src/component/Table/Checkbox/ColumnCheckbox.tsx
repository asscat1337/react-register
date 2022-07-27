import React from "react";
import {Checkbox} from "@mui/material";


type Props = {}

const ColumnCheckbox = React.forwardRef<Props,any>(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            //@ts-ignore
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} onClick={()=>console.log(resolvedRef)}/>
            </>
        )
    }
)


export {
    ColumnCheckbox
}
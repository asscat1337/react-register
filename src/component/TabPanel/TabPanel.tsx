import React from "react";
import {Box} from "@mui/material";

interface TabPanel{
    children?:React.ReactNode,
    value:number,
    index:number,
}

const TabPanel:React.FC<TabPanel>=({children,value,index})=>{
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
        >
            {value === index &&(
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

const a11yProps=(index:number)=>{
    return {
        id:`tab-${index}`,
        'aria-controls':`tabpanel-${index}`
    }
}

export {
    TabPanel,
    a11yProps
}
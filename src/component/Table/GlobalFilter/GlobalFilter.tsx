import React from "react";
import {
    Box,
    InputAdornment,
    FormControl,
    InputLabel,
    Input,
    IconButton,

} from "@mui/material";
import {Search,Clear} from "@mui/icons-material";


interface GlobalFilter{
    onSearch?:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    onClearSearch?:(event:React.MouseEvent<HTMLButtonElement>)=>void,
    value:string
}

const GlobalFilter:React.FC<GlobalFilter>=({onSearch,value,onClearSearch})=>{
    return (
        <Box sx={{mr:10,width:'250px'}}>
            <FormControl>
                <InputLabel>Поиск</InputLabel>
                <Input
                    type="text"
                    value={value}
                    onChange={onSearch}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={onClearSearch}>
                                <Clear/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {/*<TextField*/}
            {/*    onChange={onSearch}*/}
            {/*    variant="standard"*/}
            {/*    fullWidth*/}
            {/*    value={value}*/}
            {/*    placeholder="Поиск"*/}
            {/*    InputProps={{*/}
            {/*        startAdornment:(*/}
            {/*            <InputAdornment position="start">*/}
            {/*                <Search/>*/}
            {/*            </InputAdornment>*/}
            {/*        ),*/}
            {/*        endAdornment:(*/}
            {/*            <InputAdornment position="end" sx={{cursor:'pointer'}}>*/}
            {/*                <Clear/>*/}
            {/*            </InputAdornment>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
        </Box>
    )
}
export {
    GlobalFilter
}
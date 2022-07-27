import React from "react";
import {
    Box,
    IconButton, useTheme,

} from "@mui/material";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@mui/icons-material";
import {AppDispatch, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "../../../store/asyncAction/AsyncDashboard";
import {getError} from "../../../store/asyncAction/AsyncError";


interface TablePagination {
    count:number,
    page:number,
    rowsPerPage:number,
    onPageChange:(event:React.MouseEvent<HTMLButtonElement>,newPage:number)=>void
}

const TablePaginationActions=({count,page,rowsPerPage,onPageChange}:TablePagination)=>{
    const {isOpen} = useSelector((state:RootState)=>state.error)
    const dispatch:AppDispatch=useDispatch()
    const theme = useTheme()

    const handleFirstPage=async(event:React.MouseEvent<HTMLButtonElement>)=>{
        onPageChange(event,0)
        const variables = isOpen ? getError({page:0,pageSize:rowsPerPage}):getData({page:0,pageSize:rowsPerPage})
        await dispatch(variables)
    }
    const handleBackButton=async(event:React.MouseEvent<HTMLButtonElement>)=>{
         const variables = isOpen ? getError({page:page-1,pageSize:rowsPerPage}) : getData({page:page-1,pageSize:rowsPerPage})
         await dispatch(variables)
        onPageChange(event,page - 1)
    }
    const handleNextButton=async(event:React.MouseEvent<HTMLButtonElement>)=>{
         onPageChange(event,page+1)
        const variables = isOpen ? getError({page:page+1,pageSize:rowsPerPage}) : getData({page:page+1,pageSize:rowsPerPage})
         await dispatch(variables)
    }
    const handleLastPage=async(event:React.MouseEvent<HTMLButtonElement>)=>{
        const variables = isOpen ? getError({page:Math.max(0,Math.ceil(count/rowsPerPage)-1),pageSize:rowsPerPage}) : getData({page:Math.max(0,Math.ceil(count/rowsPerPage)-1),pageSize:rowsPerPage})
        await dispatch(variables)
        onPageChange(event,Math.max(0,Math.ceil(count/rowsPerPage)-1))
    }

    return (
        <Box sx={{flexShrink:0,ml:2}}>
            <IconButton
                onClick={handleFirstPage}
                aria-label="first page"
                disabled={page === 0}
            >
                {theme.direction === "rtl" ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackButton}
                disabled={page === 0}
                aria-label="prev page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButton}
                disabled={page>=Math.ceil(count/rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                aria-label="last page"
                disabled={page>=Math.ceil(count/rowsPerPage) - 1}
                onClick={handleLastPage}
            >
                {theme.direction === "rtl" ? <FirstPage/> : <LastPage/>}
            </IconButton>
        </Box>
    )
}

export {
    TablePaginationActions
}
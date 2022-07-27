import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import React from "react";
import {AppDispatch, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../../../store/slices/dashboardSlice";


interface TableToolbar {
    numSelected:number,
    deleteData:(data:any)=>void,
    editData:()=>void
}

const TableToolbar:React.FC<TableToolbar>=({numSelected,deleteData,editData})=>{
    const dispatch:AppDispatch = useDispatch()

    const openModal=():void=>{
        dispatch(toggleModal({modalOpen:true,isEdit:false}))
    }

    const openEdit=():void=>{
        dispatch(toggleModal({modalOpen:true,isEdit:true}))
        editData()
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                justifyContent:"space-between",
                pr: { xs: 1, sm: 1 },
            }}
        >
            {numSelected >0 ?(
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} выбрано
                </Typography>
            ):(
                <>
                <Tooltip title="Добавить">
                    <IconButton onClick={openModal}>
                        <Add/>
                    </IconButton>
                </Tooltip>
                </>
            )}
            {numSelected > 0 ? (
                <>
                <Tooltip
                    title="Delete"
                >
                    <IconButton onClick={deleteData}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
                    {numSelected < 2 ? (
                        <Tooltip
                            title="Edit"
                        >
                        <IconButton onClick={openEdit}>
                            <Edit/>
                        </IconButton>
                        </Tooltip>
                    ):null}
                </>
            ):null}
        </Toolbar>
    )
}
export {
    TableToolbar
}
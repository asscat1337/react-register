import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    styled
} from "@mui/material";
import {useDispatch,useSelector} from "react-redux";
import {toggleModal} from '../../store/slices/dashboardSlice'
import React from "react";
import {AppDispatch, RootState} from "../../store";
import {FormRequest} from "../Forms/FormRequest/FormRequest"
import {FormError} from "../Forms/FormError/FormError";
import {closeEdit} from "../../store/slices/errorSlice";

const MyModal = styled(Dialog)(({ theme }) => ({
      '& .MuiDialog-container': {
          '& .MuiPaper-root': {
              width: 'calc(100% - 65px)'
          }
      }
}));

interface IModal{
   notify:(message:string)=>void
}

const Modal:React.FC<IModal>=({notify})=>{
    const {isOpen} = useSelector((state:RootState)=>state.error)
    const dispatch:AppDispatch = useDispatch()
    const {modalOpen,isEdit} = useSelector((state:RootState)=>state.dashboard)

    const handleClose=()=>{
        dispatch(toggleModal({modalOpen:false,isEdit:false}))
        if(isOpen){
            dispatch(closeEdit())
        }
    }

    return (
            <MyModal open={modalOpen} onClose={handleClose}>
                <DialogTitle>{isEdit ? "Редактировать" : "Добавить"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Tecт</DialogContentText>
                    {isOpen ?
                        <FormError
                            notify={notify}
                        />
                        :
                        <FormRequest
                            notify={notify}
                            isEdit={isEdit}
                        />
                    }
                </DialogContent>
            </MyModal>
    )
}
export {
    Modal
}
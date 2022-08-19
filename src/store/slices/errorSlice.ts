import {createSlice} from "@reduxjs/toolkit";
import {IError} from "../types/ErrorTypes";
import {closeError, createError, deleteError, getError, searchError, updateError} from '../asyncAction/AsyncError'


const initialState:IError = {
    errorData:[],
    loading:true,
    pageError:0,
    pageSizeError:5,
    countError:0,
    isOpen:false,
    editData:{},
    isEdit:false,
    isError:false,
    message:""
}


const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers:{
        openSecondTable(state,{payload}){
            state.isOpen = payload
        },
        setEditError(state,{payload}){
            state.editData = payload
            state.isEdit = true
        },
        closeEdit(state){
            return {
                ...state,
                editData:{},
                isEdit: false
            }
        }
    },
    extraReducers:builder => {
        builder.addCase(getError.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(getError.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                errorData:action.payload.rows,
                countError:action.payload.count
            }
        })
        builder.addCase(getError.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(searchError.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(searchError.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                errorData:action.payload
            }
        })
        builder.addCase(searchError.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(createError.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(createError.fulfilled,(state,action)=>{
            return {
                ...state,
                loading: false,
                errorData: [...state.errorData!, action.payload.newData]
            }
        })
        builder.addCase(createError.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(deleteError.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(deleteError.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                errorData:state.errorData!.filter(item=>{
                    return !action.payload.deleted.includes(item.error_id)
                })
            }
        })
        builder.addCase(deleteError.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(updateError.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(updateError.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                errorData:state!.errorData!.map(item=>{
                    if(item.error_id === action.payload.data.error_id){
                        return {
                            ...action.payload.data
                        }
                    }
                    return item
                })
            }
        })
        builder.addCase(updateError.rejected,(state,action)=>{
            return {
                ...state,
                loading:false
            }
        })
        builder.addCase(closeError.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(closeError.fulfilled,(state,{payload})=>{
            return {
                ...state,
                errorData:state.errorData.map(item=>{
                    if(item.error_id === payload.error_id){
                        return {
                            ...item,
                            end_time: payload.end_time
                        }
                    }
                    return item
                })
            }

        })
    }
})

export const {openSecondTable,setEditError,closeEdit} = errorSlice.actions

export default errorSlice.reducer



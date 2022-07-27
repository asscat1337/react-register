import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {register,loginUser,logout} from "../asyncAction/AsyncUser";
import {IUser} from "../types/userTypes";


const initialState:IUser={
    user:[],
    loading:false,
    auth:false,
    isError:false,
    message:""
}

const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        clearMessageError(state){
            return {
                ...state,
                isError:false,
                message:""
            }
        }
    },
    extraReducers:builder => {
        builder.addCase(loginUser.pending,(state,action)=>{
            return {
                ...state,
                loading:true,
                auth:false,
                user:[]
            }
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:true,
                user:action.payload,
                auth:true
            }
        })
        builder.addCase(loginUser.rejected,(state,action:PayloadAction<any,any>)=>{
            return {
               ...state,
               loading:true,
               message:action.payload.message,
               isError:action.payload.auth
           }
        })
        builder.addCase(register.pending,(state,action)=>{
            return {
                ...state,
                loading:true,
                auth:false,
                user:[]
            }
        })
        builder.addCase(register.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                auth:true,
                user:action.payload
            }
        })
        builder.addCase(register.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(logout.fulfilled,(state,action)=>{
            return {
                ...state,
                auth:false,
                user:[]
            }
        })
    }
})
export const {clearMessageError} = UserSlice.actions
export default UserSlice.reducer
import {createAsyncThunk} from "@reduxjs/toolkit";
import {$http} from "../../$http/$http";
import {AxiosError} from "axios";


const loginUser = createAsyncThunk(
    'user/loginUser',
    async(payload:any,thunkAPI)=>{
        try{
            const {data} = await $http.post('/user/login',payload,{
                params:{
                    token:localStorage.getItem('token')
                }
            })
            localStorage.setItem('token',data.token.accessToken)
            return data
        }catch (e){
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error?.response?.data)
        }
    }
)

const register = createAsyncThunk(
    'user/register',
    async(payload,thunkAPI)=>{
        const {data} = await $http.post('/user/register',payload)

        return data
    }
)
const logout = createAsyncThunk(
    'user/logout',
    async(thunkAPI)=>{
        await $http.get('/user/logout')
    }
)
export {
    loginUser,
    register,
    logout
}
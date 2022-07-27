import {$http} from "../../$http/$http";
import {createAsyncThunk} from "@reduxjs/toolkit";


const createError=createAsyncThunk(
    'error/create',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.post('/errorSite/create',payload)
        return data
    })
const getError=createAsyncThunk(
    'error/get',
    async(payload:any,thunkAPI)=>{
        console.log(payload)
        const {data} = await $http.get('/errorSite/get',{
            params:{
                page:payload.page,
                limit:payload.limit
            }
        })

        return data
    }
)

const updateError=createAsyncThunk(
    'error/update',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.put('/errorSite/update',payload)

        return data
    }
)

const deleteError=createAsyncThunk(
    'error/delete',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.delete('/errorSite/delete',{
            data:{
                payload
            }
        })

        return {deleted:payload,message:data.message}
    }
)
const searchError = createAsyncThunk(
    'error/search',
    async(payload:string,thunkAPI)=>{
        const {data} = await $http.get('/errorSite/search',{
            params:{
                id:payload
            }
        })
        return data
    }
)


export {
    createError,
    deleteError,
    getError,
    updateError,
    searchError
}
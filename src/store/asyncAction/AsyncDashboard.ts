import {createAsyncThunk} from "@reduxjs/toolkit";
import {$http} from "../../$http/$http";


const getStatus = createAsyncThunk(
    'dashboard/get-status',
    async(thunkAPI)=>{
        const {data} = await $http.get('/status/get')
        return data
    })
const getData = createAsyncThunk(
    'dashboard/get-data',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.get('/dashboard/get',{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                page:payload.page,
                limit:payload.pageSize
            }
        })

        return {data,size:payload}
    }
)
const createData = createAsyncThunk(
    'dashboard/create',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.post('/dashboard/create',payload)

        return data
    }
)
const deleteData = createAsyncThunk(
    'dashboard/delete',
    async(payload:any,thunkAPI)=>{
          const {data} = await $http.delete ('/dashboard/delete',{
               data:{
                   payload
               }
           })
        return {deleted:payload,data}
    }
)
const updateData = createAsyncThunk(
    `dashboard/update`,
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.put('/dashboard/update',payload)

        return data
    }
)
const searchData = createAsyncThunk(
    'dashboard/find-data',
    async(payload:string,thunkAPI)=>{
        const {data} = await $http.get('/dashboard/find',{
            params:{
                query:payload
            }
        })
        return data
    }
)
const filterData = createAsyncThunk(
    'dashboard/filter',
    async(payload:any,thunkAPI)=>{
        const {data} = await $http.get('/dashboard/filter',{
            params:{
                id:payload.id,
                start_date:payload.id,
                end_date:payload.id
            }
        })

        return data
    }
)
const resetAll = createAsyncThunk(
    'dashboard/reset',
    async(thunkAPI)=>{
        const {data} = await $http.get('/dashboard/reset')

        return data
    }
)
const getUsers = createAsyncThunk(
    'dashboard/get-users',
    async(thunkAPI)=>{
        const {data} = await $http.get('/dashboard/get-users')

        return data
    }
)


export {
    getStatus,
    getData,
    createData,
    deleteData,
    updateData,
    searchData,
    filterData,
    resetAll,
    getUsers
}
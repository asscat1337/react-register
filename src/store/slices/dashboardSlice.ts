import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDashboard,Dashboard} from "../types/dashboardTypes";
import {
    getStatus,
    getData,
    createData,
    deleteData,
    updateData,
    searchData,
    filterData, resetAll, getUsers, closeRequest
} from "../asyncAction/AsyncDashboard";

const initialState:IDashboard = {
    data:[],
    loading:false,
    modalOpen:false,
    status:[],
    isEdit:false,
    pageSize:5,
    page:0,
    count:0,
    editData:{
        request_id:0,
        description:"",
        start_date:"",
        end_date:"",
        numberRequest:"",
        author:0,
        comment:"",
        status:{}
    },
    users:[],
    isSuccess:false,
}

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        toggleModal(state,action){
            state.modalOpen = action.payload.modalOpen
            state.isEdit = action.payload.isEdit
        },
        setEditData(state,action:PayloadAction<Dashboard>){
            state.editData = action.payload
        }
    },
    extraReducers:builder => {
        builder.addCase(getStatus.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getStatus.fulfilled,(state,action)=>{
            state.status = action.payload
            state.loading = false
        })
        builder.addCase(getStatus.rejected,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getData.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getData.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload.data.rows
            state.count = action.payload.data.count
            state.pageSize = action.payload.size.pageSize
            state.page = action.payload.size.page
        })
        builder.addCase(getData.rejected,(state,action)=>{
            state.loading = true
        })
        builder.addCase(createData.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(createData.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                data:[...state.data,action.payload.newData],
                isSuccess:true,
            }
        })
        builder.addCase(createData.rejected,(state,action)=>{
            state.loading = true
        })
        builder.addCase(deleteData.fulfilled,(state,action)=>{
            return {
                ...state,
                data:state.data.filter(item=>!action.payload.deleted.includes(item.request_id)),
                isSuccess:true
            }
        })
        builder.addCase(updateData.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(updateData.fulfilled,(state,action)=>{
            console.log(action.payload.updateData)
            return {
                ...state,
                loading:false,
                data:state.data.map(item=>{
                    if(item.request_id === action.payload.updateData.request_id){
                        return {
                            ...action.payload.updateData
                        }
                    }
                    return item
                }),
                isSuccess:true,
            }
        })
        builder.addCase(updateData.rejected,(state,action)=>{
            state.loading = false
        })
        builder.addCase(searchData.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(searchData.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(searchData.rejected,(state,action)=>{
            state.loading = true
        })
        builder.addCase(filterData.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(filterData.fulfilled,(state,action)=>{
           return {
               ...state,
               loading:false,
               data:action.payload
           }
        })
        builder.addCase(filterData.rejected,(state,action)=>{
            state.loading = false
        })
        builder.addCase(resetAll.pending,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(resetAll.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                data:action.payload.rows,
                count:action.payload.count
            }
        })
        builder.addCase(resetAll.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(getUsers.pending,(state,action)=>{
            return {
                ...state,
                loading:true,
            }
        })
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            return {
                ...state,
                loading:false,
                users:action.payload
            }
        })
        builder.addCase(getUsers.rejected,(state,action)=>{
            return {
                ...state,
                loading:true
            }
        })
        builder.addCase(closeRequest.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(closeRequest.fulfilled,(state,{payload})=>{
            state.data = state.data.map(item=>{
                if(item.request_id === payload.data.request_id){
                    return {
                        ...item,
                        end_date: payload.data.end_date
                    }
                }
                return item
            })
        })
        builder.addCase(closeRequest.rejected,(state,action)=>{
            state.loading = true
        })
    }
})

export const {toggleModal,setEditData} = dashboardSlice.actions
export default dashboardSlice.reducer
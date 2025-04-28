import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IQueryType } from "../interfacers or types/interfaces";
import userSvc from "../services/user.service";


const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (query:IQueryType) =>{
        const response = await userSvc.getRequest('/user/all',{
            params:{
                page:query?.page || 1,
                limit:query?.limit || 10,
                search:query?.search || null
            }
        })
        return users.result.data
    }
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
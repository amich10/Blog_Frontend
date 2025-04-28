import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IQueryType } from "../interfacers or types/interfaces";
import userSvc from "../services/user.service";


const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (query:IQueryType) =>{
        const users = await userSvc.
    }
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
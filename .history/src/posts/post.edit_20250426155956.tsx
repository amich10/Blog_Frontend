import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IQueryType } from "../interfacers or types/interfaces";


const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (query:IQueryType) =>{
        const users = await users
    }
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
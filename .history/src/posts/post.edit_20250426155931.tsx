import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (query:IQ)
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
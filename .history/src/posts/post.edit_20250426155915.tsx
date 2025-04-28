import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAllUsers = createAsyncThunk(
    "user/getAllUsers"
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
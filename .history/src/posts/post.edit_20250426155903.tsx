import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAllUsers = createAsyncThunk(
    "user"
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
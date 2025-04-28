import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAllUsers = createAsyncThunk(
    "user/getA"
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    }
})
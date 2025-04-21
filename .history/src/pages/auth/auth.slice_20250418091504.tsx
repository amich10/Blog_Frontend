import { createSlice } from "@reduxjs/toolkit";


interface IAuthState {

    loggedInUserDetails?:I
}

const initialState = {
    userdetails : null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    }
})

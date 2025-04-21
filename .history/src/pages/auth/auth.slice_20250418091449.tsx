import { createSlice } from "@reduxjs/toolkit";


interface IAuthState {
    loggedInUserDetails
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

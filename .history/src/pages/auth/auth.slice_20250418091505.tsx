import { createSlice } from "@reduxjs/toolkit";


interface IAuthState {

    loggedInUserDetails?:IU
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

import { createSlice } from "@reduxjs/toolkit";
import { IUserDetails } from "../../types/auth.types";


interface IAuthState {

    loggedInUserDetails?:IUserDetails
}

const initialState = {
    userdetails : null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    ex
})

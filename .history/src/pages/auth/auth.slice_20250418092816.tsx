import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetails } from "../../types/auth.types";
import { loginUser } from "./reducers/auth.thunk";


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
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state,action:PayloadAction<IUserDetails>) =>{
            state.userdetails = action.payload;
        })
    },
})

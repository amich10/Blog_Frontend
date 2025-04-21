import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./auth.thunk";
import { IUserDetails } from "../../../types/auth.types";



interface IAuthState {

    loggedInUser?:IUserDetails
}

const initialState:IAuthState = {
   loggedInUser : undefined
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state,action:PayloadAction<IUserDetails>) =>{
            state.loggedInUser = action.payload;
        })
        .addCase(loginUser.rejected,(state) =>{
            state.loggedInUser = undefined
        })
    },
})

export
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, fetchUserDetails, forgetPassword } from "./auth.thunk";
import { IUserDetails } from "../../types/auth.types";

interface AuthState {
  userDetails?: IUserDetails;
  loading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  userDetails: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userDetails = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      // FETCH USER
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
        state.userDetails = undefined; 
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

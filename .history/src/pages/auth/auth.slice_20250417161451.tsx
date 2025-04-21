import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, fetchUserDetails, forgetPassword } from "./authThunks";
import { IUserDetails } from "../../types/auth.types";

interface AuthState {
  userDetails?: IUserDetails;
  loading: boolean;
}

const initialState: AuthState = {
  userDetails: undefined,
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.userDetails = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

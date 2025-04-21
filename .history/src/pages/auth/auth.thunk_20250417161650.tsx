import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../types/auth.types";
import authSvc from "../../services/auth.service";
import { setLocalStorage } from "../../utilities/helpers";
import { webStorageConstants } from "../../constants/constants";



export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: ICredentials, thunkAPI) => {
    try {
      const response = await authSvc.postRequest("/auth/login", credentials);
     setLocalStorage(webStorageConstants.ACCESS, response.result.data.accessToken);
      setLocalStorage(webStorageConstants.REFRESH, response.result.data.refreshToken);
      const userInfo = await authSvc.getRequest("auth/me");
      return userInfo.result.data;
    } catch (error: any) {
      notifcation(error.response.message || "Login failed", NotificationType.ERROR);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, thunkAPI) => {
    try {
      const response = await authSvc.getRequest("auth/me");
      return response.result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data: { email: string }, thunkAPI) => {
    try {
      const response = await authSvc.postRequest("auth/forget-password", data);
      notifcation(response.result.message, NotificationType.SUCCESS);
    } catch (error: any) {
      notifcation(error.response.message || "Something went wrong", NotificationType.ERROR);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

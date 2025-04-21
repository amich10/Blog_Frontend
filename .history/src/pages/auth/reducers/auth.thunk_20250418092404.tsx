import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../../types/auth.types";
import authSvc from "../../../services/auth.service";
import notifcation, { setLocalStorage } from "../../../utilities/helpers";
import { webStorageConstants } from "../../../constants/constants";

export const loginUser = createAsyncThunk(
  'auth/loginUser',async (credentials:ICredentials) => {
    try {
      const response = await authSvc.postRequest("/auth/login",credentials)
      setLocalStorage(webStorageConstants.ACCESS,response.result.data.accessTokn)
      setLocalStorage(webStorageConstants.REFRESH,response.result.data.refreshToken)
    } catch (exxception:any) {
      notifcation(exxception.response.message)
    }
  }
)
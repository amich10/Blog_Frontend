import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../../types/auth.types";
import authSvc from "../../../services/auth.service";
import notifcation, { NotificationType, setLocalStorage } from "../../../utilities/helpers";
import { webStorageConstants } from "../../../constants/constants";

export const loginUser = createAsyncThunk(
  'auth/loginUser',async (credentials:ICredentials) => {
    try {
      const response = await authSvc.postRequest("/auth/login",credentials)
      setLocalStorage(webStorageConstants.ACCESS,response.result.data.accessToken)
      setLocalStorage(webStorageConstants.REFRESH,response.result.data.refreshToken)

      const userInfo = await authSvc.getRequest("auth/me");
      return userInfo.result.data;
    } catch (exxception:any) {
      notifcation(exxception.response.message,NotificationType.ERROR)
    }
  }
)


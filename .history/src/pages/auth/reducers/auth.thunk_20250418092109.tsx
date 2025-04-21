import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../../types/auth.types";
import authSvc from "../../../services/auth.service";

export const loginUser = createAsyncThunk(
  'auth/loginUser',async (credentials:ICredentials) => {
    try {
      const response = await authSvc.po
    } catch (exxception) {
      
    }
  }
)
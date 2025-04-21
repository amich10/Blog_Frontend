import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../../types/auth.types";

export const loginUser = createAsyncThunk({
  'auth/loginUser'
})
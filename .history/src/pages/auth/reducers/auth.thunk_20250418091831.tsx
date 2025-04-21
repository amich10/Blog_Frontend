import { createAsyncThunk } from "@reduxjs/toolkit";
import {ICR}

export const loginUser = createAsyncThunk({
  'auth/loginUser',
  async(credentials:ICred) =>{}
})
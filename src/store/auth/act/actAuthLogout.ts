import { authEndpoints } from "@/api/endpointsAuth";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";



const actAuthLogout = createAsyncThunk(
  "auth/actAuthLogout",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.post(authEndpoints.logout);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data || error.response?.data.message || error.message);
      } else {
        return "An unexpected error";
      }

    }
  }
);

export default actAuthLogout;

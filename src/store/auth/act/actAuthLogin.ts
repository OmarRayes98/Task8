import { authEndpoints } from "@/api/endpointsAuth";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  data:{
    user: {
    email: string;
    first_name: string;
    last_name: string;
    user_name:string;
    profile_image:string;
  };
  token: string;
  }
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.post<TResponse>(authEndpoints.login, formData,{
        headers: {
          ...axiosPublic.defaults.headers.common,
          'Content-Type': 'multipart/form-data',
        },
      });
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

export default actAuthLogin;

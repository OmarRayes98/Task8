import { authEndpoints } from "@/api/endpointsAuth";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import  { isAxiosError } from "axios";

interface ResponseData {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  token: string; 
  user: User;
}

interface User {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  profile_image_url: string; 
}
type TFormData = {
  first_name: string;
  last_name: string;
  user_name:string;
  email:string;
  password:string;
  password_confirmation:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile_image:any;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.post<ResponseData>(authEndpoints.register, formData,{
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

export default actAuthRegister;

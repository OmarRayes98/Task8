import { dashboardEndpoints } from "@/api/endpointsDashboard";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";



type TResponse = {
  
    id: string;
    name: string;
    price: string;
    user_name:string;
    image_url:string;
    created_at:string;
    updated_at:string;
};

const actGetProduct = createAsyncThunk(
  "products/actGetProduct",
  async (id:string |number, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.get<TResponse>(dashboardEndpoints.item(id));
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

export default actGetProduct;

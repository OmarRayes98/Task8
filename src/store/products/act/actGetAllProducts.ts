import { dashboardEndpoints } from "@/api/endpointsDashboard";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

type TResponse = {
  data: {
    products: [
      {
        _id: string;
        name: string;
        price: string;
        user_name: string;
        image: {
          url: string;
          publicId: string;
        };
        created_at: string;
        updated_at: string;
      }
    ];
  };
};

const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.get<TResponse>(dashboardEndpoints.items);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      } else {
        return "An unexpected error";
      }
    }
  }
);

export default actGetAllProducts;

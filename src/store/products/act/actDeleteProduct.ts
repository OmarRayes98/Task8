import { dashboardEndpoints } from "@/api/endpointsDashboard";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";





const actDeleteProduct = createAsyncThunk(
  "products/actDeleteProduct",
  async (id:string |number, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosPublic.delete(dashboardEndpoints.item(id));
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

export default actDeleteProduct;

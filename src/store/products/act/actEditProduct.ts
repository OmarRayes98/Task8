import { dashboardEndpoints } from "@/api/endpointsDashboard";
import { axiosPublic } from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

type TFormData = {
  id?:string|number;
  name: string;
  price: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image:any;
  _method:string;
};



const actEditProduct = createAsyncThunk(
  "products/actEditProduct",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    const formDataWithoutID = {...formData};
    delete formDataWithoutID["id"];
    // console.log(formDataWithoutID,"formData")

    try {
      const res = await axiosPublic.post(dashboardEndpoints.item(formData._id!), formDataWithoutID,{
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

export default actEditProduct;

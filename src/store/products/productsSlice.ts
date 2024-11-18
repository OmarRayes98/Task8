import { createSlice } from "@reduxjs/toolkit";

import { TLoading, TProduct } from "@/types/shared.types";
import actGetAllProducts from "./act/actGetAllProducts";
import actGetProduct from "./act/actGetProduct";
import actDeleteProduct from "./act/actDeleteProduct";
import actAddProduct from "./act/actAddProduct";
import actEditProduct from "./act/actEditProduct";


interface IProductsState {

  loading: TLoading;
  error: string | null;
  allProducts:TProduct[];
  product:TProduct | null ;
  filterProducts:TProduct[]
  loadingProduct:TLoading;
}

const initialState: IProductsState = {

  loading: "idle",
  error: null,
  allProducts:[],
  product:null ,
  loadingProduct:"idle",
  filterProducts:[]
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    searchProducts: (state, action) => {
      const searchTerm = action.payload;

      if(searchTerm===""){
        state.filterProducts = state.allProducts
        return
      }

      state.filterProducts = state.allProducts.filter(item =>
        item?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },

    resetDetailsProduct:(state)=>{
      state.product=null;
    }
  },
  extraReducers: (builder) => {
            // All Prdoucts
            builder.addCase(actGetAllProducts.pending, (state) => {
                state.loading = "pending";
                state.error = null;
              });
              builder.addCase(actGetAllProducts.fulfilled, (state,action) => {
                state.loading = "succeeded";
                if(typeof action.payload ==="object")
                state.allProducts=action.payload;
              });
              builder.addCase(actGetAllProducts.rejected, (state, action) => {
                state.loading = "failed";
                if (typeof action.payload === "string") {
                  state.error = action.payload;
                }
              });

            // One Prdouct
            builder.addCase(actGetProduct.pending, (state) => {
                state.loadingProduct = "pending";
                state.error = null;
                
              });
              builder.addCase(actGetProduct.fulfilled, (state,action) => {
                state.loadingProduct = "succeeded";
                if(typeof action.payload ==="object")
                state.product=action.payload;
              });
              builder.addCase(actGetProduct.rejected, (state, action) => {
                state.loadingProduct = "failed";
                if (typeof action.payload === "string") {
                  state.error = action.payload;
                }
              });

            // Delete Product
              builder.addCase(actDeleteProduct.fulfilled, () => {
                // state.loading = "succeeded";
              });
              builder.addCase(actDeleteProduct.rejected, (state, action) => {
                // state.loading = "failed";
                if (typeof action.payload === "string") {
                  state.error = action.payload;
                }
              });

            // Add Product
            builder.addCase(actAddProduct.pending, (state) => {
                state.loading = "pending";
                state.error = null;
              });
              builder.addCase(actAddProduct.fulfilled, (state) => {
                state.loading = "succeeded";
              });
              builder.addCase(actAddProduct.rejected, (state, action) => {
                state.loading = "failed";
                if (typeof action.payload === "string") {
                  state.error = action.payload;
                }
              });

            // Edit Product
            builder.addCase(actEditProduct.pending, (state) => {
                state.loading = "pending";
                state.error = null;
              });
              builder.addCase(actEditProduct.fulfilled, (state) => {
                state.loading = "succeeded";
              });
              builder.addCase(actEditProduct.rejected, (state, action) => {
                state.loading = "failed";
                if (typeof action.payload === "string") {
                  state.error = action.payload;
                }
              });
  },
});

export const { searchProducts , resetDetailsProduct } = productsSlice.actions;
export default productsSlice.reducer;

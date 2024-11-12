import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { TLoading } from "@/types/shared.types";
import localStorageHelper from "@/utils/localStorage";
import actAuthLogout from "./act/actAuthLogout";

interface IAuthState {
  user: {
    email: string;
    first_name: string;
    last_name: string;
    user_name:string;
    profile_image_url:string;
  } | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null ,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state,action) => {
      state.loading = "succeeded";
      if( typeof action.payload=== 'object'){
        state.token = action.payload.data.token;
        localStorageHelper.setToken(state.token);

        state.user = action.payload.data.user;
        localStorageHelper.setUser(state.user);

        }
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if( typeof action.payload=== 'object'){
      state.token = action.payload.token;
      localStorageHelper.setToken(state.token);

      state.user = action.payload.user;
      localStorageHelper.setUser(state.user);

      }
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

        // logout
        builder.addCase(actAuthLogout.pending, (state) => {
          state.loading = "pending";
          state.error = null;
        });
        builder.addCase(actAuthLogout.fulfilled, (state) => {
          state.loading = "succeeded";
          localStorageHelper.removeTokenAndUSer();
          
        });
        builder.addCase(actAuthLogout.rejected, (state, action) => {
          state.loading = "failed";
          if (typeof action.payload === "string") {
            state.error = action.payload;
          }
        });
  },
});

export { actAuthRegister, actAuthLogin };
export const { resetUI } = authSlice.actions;
export default authSlice.reducer;

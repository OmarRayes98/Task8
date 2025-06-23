import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import storageHelper from "@/utils/Storage";
import actAuthLogout from "./act/actAuthLogout";
import { IAuthState } from "@/types/auth.types";

const initialState: IAuthState = {
  user: storageHelper.getUser() || null,
  token: storageHelper.getToken() || null,
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
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (typeof action.payload === "object") {
        state.token = action.payload.data.token;
        storageHelper.setToken(state.token);

        state.user = action.payload.data.user;
        storageHelper.setUser(state.user);
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
      if (typeof action.payload === "object") {
        console.log(action.payload, "action.payload");
        state.token = action.payload?.data.token;
        storageHelper.setToken(state.token);

        state.user = action.payload?.data?.user;
        storageHelper.setUser(state.user);
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
      storageHelper.removeTokenAndUSer();
      state.user = null;
      state.token = null;
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

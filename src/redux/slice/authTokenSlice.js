import { createSlice } from "@reduxjs/toolkit";
import {
  ForgotPasswordRequest,
  LoginAuthenticationRequest,
  OtpVerifyRequest,
  ResetPasswordRequest,
} from "../service/loginService";

const initialState = {
  token: "",
  loading: false,
  apierror: "",
  validEmail: false,
  emailAddress: "",
  rememberToken: "",
};

export const loginAccess = createSlice({
  name: "loginAccess",
  initialState,
  reducers: {
    tokenGenerate: (state, action) => {
      state.token = action.payload;
    },
    changeValidEmailState: (state) => {
      state.validEmail = false;
      state.apierror = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuthenticationRequest.pending, (state, action) => {
        state.loading = true;
        state.apierror = "";
      })
      .addCase(LoginAuthenticationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.apierror = "";
      })
      .addCase(LoginAuthenticationRequest.rejected, (state, action) => {
        state.loading = false;
        state.apierror = action.payload.response.data.message;
      })
      .addCase(ForgotPasswordRequest.pending, (state, action) => {
        state.loading = true;
        state.apierror = "";
        state.emailAddress = action.meta.arg.email;
      })
      .addCase(ForgotPasswordRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.validEmail = true;
        state.rememberToken = action.payload.data.remember_token;
      })
      .addCase(ForgotPasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.apierror = action.payload.response.data.message;
      })
      .addCase(OtpVerifyRequest.pending, (state, action) => {
        state.loading = true;
        state.apierror = "";
      })
      .addCase(OtpVerifyRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.rememberToken = action.payload.data.remember_token;
        state.apierror = "";
      })
      .addCase(OtpVerifyRequest.rejected, (state, action) => {
        state.loading = false;
        state.apierror = action.payload.response.data.message;
      })
      .addCase(ResetPasswordRequest.pending, (state, action) => {
        state.loading = true;
        state.apierror = "";
      })
      .addCase(ResetPasswordRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.rememberToken = "";
        state.apierror = "";
      })
      .addCase(ResetPasswordRequest.rejected, (state, action) => {
        console.log('action90', action.payload.response.data.message);
        state.loading = false;
        state.apierror = action.payload.response.data.message;
      });
  },
});

export const { tokenGenerate, changeValidEmailState } = loginAccess.actions;

export default loginAccess.reducer;

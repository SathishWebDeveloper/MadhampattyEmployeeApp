import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "utils/common/requests";
import { PLUGINS_API_END_POINTS } from "utils/helpers/api";

const appConfig = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
};
const apiBaseUrl = appConfig.BASE_URL;

export const LoginAuthenticationRequest = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    try {
      const data = {
        email: payload.email,
        password: payload.password,
      };
      const response = await axiosRequest(
        `${apiBaseUrl}${PLUGINS_API_END_POINTS.auth.login.endpoint}`,
        PLUGINS_API_END_POINTS.auth.login.method,
        data
      );
      payload.callback();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ForgotPasswordRequest = createAsyncThunk(
  "users/forgotpassword",
  async (payload, thunkAPI) => {
    try {
      const data = {
        email: payload.email,
      };
      const response = await axiosRequest(
        `${apiBaseUrl}${PLUGINS_API_END_POINTS.auth.forgotpassword.endpoint}`,
        PLUGINS_API_END_POINTS.auth.forgotpassword.method,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const OtpVerifyRequest = createAsyncThunk(
  "users/otpverify",
  async (payload, thunkAPI) => {
    try {
      const data = {
        otp: payload.otpValue,
      };
      const response = await axiosRequest(
        `${apiBaseUrl}${PLUGINS_API_END_POINTS.auth.verifyotp.endpoint}/${payload.temporaryToken}`,
        PLUGINS_API_END_POINTS.auth.verifyotp.method,
        data
      );
      payload.callback();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const ResetPasswordRequest = createAsyncThunk(
  "users/resetpassword",
  async (payload, thunkAPI) => {
    try {
      const data = {
        password: payload.passwordOne,
        confirm_password:payload.passwordTwo,
      };
      console.log('data', payload);
      console.log('url', `${apiBaseUrl}${PLUGINS_API_END_POINTS.auth.resetpassword.endpoint}/${payload.temporaryToken}`);
      const response = await axiosRequest(
        `${apiBaseUrl}${PLUGINS_API_END_POINTS.auth.resetpassword.endpoint}/${payload.temporaryToken}`,
        PLUGINS_API_END_POINTS.auth.resetpassword.method,
        data
      );
      payload.callback();
      console.log('response',response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

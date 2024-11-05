import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosRequest from "utils/common/requests";
import { PLUGINS_API_END_POINTS } from "utils/helpers/api";

const appConfig = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
};
const apiBaseUrl = appConfig.BASE_URL;

export const staffenrollTableData = createAsyncThunk(
  "staffenroll/tabledata",
  async (payload, thunkAPI) => {
    return await axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${payload.page}&_limit=${payload.pageLimit}`
      )
      .then((res) => {
        const responseData = res.data;
        const pageData = Math.ceil(
          parseInt(res.headers["x-total-count"]) / payload.pageLimit
        );
        const totalDataCount = parseInt(res.headers["x-total-count"]);
        return { responseData, pageData, totalDataCount };
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue("No Data Found");
      });
  }
);

export const staffenrollPincodeData = createAsyncThunk(
  "staffenroll/pincodedata",
  async (payload, thunkAPI) => {
    return await axios
      .get(`https://api.postalpincode.in/pincode/${payload}`)
      .then((res) => {
        const [responseData] = res.data;
        return responseData;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue("No Data Found");
      });
  }
);





export const createUserRequest = createAsyncThunk(
  "users/create",
  async (payload, thunkAPI) => {
    try {
      const data = {
        first_name : payload.firstname,
        last_name :payload.lastname,
        email : payload.email,
        mobile : payload.mobileno,
        password :payload.password,
        image : payload.imgfile,
        designation : payload.designation,
        date_of_joining : "2023-02-02",
        status : 1
      };
      //  const token = ""
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${payload.authKey}`
      };

      console.log('payload', payload);
      const response = await axiosRequest(
        `${apiBaseUrl}${PLUGINS_API_END_POINTS.register.createuser.endpoint}`,
        PLUGINS_API_END_POINTS.register.createuser.method,
        data,
        headers
      );
      payload.callback();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

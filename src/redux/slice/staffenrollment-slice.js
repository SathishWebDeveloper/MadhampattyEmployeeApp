import { createSlice } from "@reduxjs/toolkit";
import {
  createUserRequest,
  staffenrollPincodeData,
  staffenrollTableData,
} from "../service/staffenrollment-service";

const initialState = {
  loading: false,
  errorMessage: "",
  tableData: [],
  pageCount: 0,
  totalDataCount: 0,
  pinCode: { city: null, state: null, country: null , error : ""},
};

export const staffenroll = createSlice({
  name: "staffenroll",
  initialState,
  // reducers:{
  //     changeTableData : (state) => {
  //         state.loading = true;
  //     },

  // },
  extraReducers: (builder) => {
    builder
      .addCase(staffenrollTableData.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(staffenrollTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = "";
        state.tableData = action.payload.responseData;
        state.pageCount = action.payload.pageData;
        state.totalDataCount = action.payload.totalDataCount;
        // need to change
      })
      .addCase(staffenrollTableData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = "No Data Found";
      })
      .addCase(staffenrollPincodeData.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(staffenrollPincodeData.fulfilled, (state, action) => {
        if (action.payload?.Status === "Success") {
           const pinCodeData = action.payload?.PostOffice[0];
            if(pinCodeData){
               state.pinCode = {city: pinCodeData.District, state: pinCodeData.State, country: pinCodeData.Country}
            }

        } else if (action.payload?.Status === "Error") {
              state.pinCode = { city: null, state: null, country: null , error : action.payload.Message}
        }
      })
      .addCase(staffenrollPincodeData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = "No Data Found";
      })
      .addCase(createUserRequest.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(createUserRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(createUserRequest.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = "No Data Found";
      })
  },
});

export default staffenroll.reducer;
// export const {}

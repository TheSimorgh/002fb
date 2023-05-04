/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../axios/CustomAxios";
import Cookies from "js-cookie";
import axios from "axios";


// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  loading: false,
  message: "",
  error: "",
  successMessage: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/register`,
        userInfo
      );
      // if (!response.ok) {
      //   return rejectWithValue(response.data.message);
      // }
      // if(!response.ok) throw new Error (response.data.message,response.status)
      const { message, ...rest } = response.data;
      Cookies.set("user", JSON.stringify(rest));
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data.message);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return rejectWithValue(error.response.data.message);
      return rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (userInfo, { rejectWithValue }) => {
    try {
      axios;
      const response = await axios.post(
        `http://localhost:8000/login`,
        userInfo
      );
      // if(!response.ok) {
      //    throw new Error (response.data.message,response.status)
      // }
      Cookies.set("user", JSON.stringify(response.data));
      console.log("signin = createAsyncThunk");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data.message);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return rejectWithValue(error.response.data.message);
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset:(state)=>{
      state.user= null
      state.isError= false
      state.isSuccess= false
      state.loading=false
      state.message= ""
      state.error= ""
      state.successMessage=""
    },
    setUser2: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    login(state,action){
        state.user===action.payload
    }
    ,logout(state,action){
        state.user=action.payload
    } ,

    truly(state) {
      state.isSuccess = !state.isSuccess;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isSuccess = false;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user=action.payload
        const { message, ...rest } = state.user;
        // state.user = rest
        state.successMessage = message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.message = action.payload;
        state.user=null
        // state.successMessage = "";
      }).addCase(signin.pending, (state) => {
        state.isSuccess = false;
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user=action.payload
        const { message, ...rest } = state.user;
        // state.user = rest
        state.successMessage = message;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.message = action.payload;
        state.user=null
        // state.successMessage = "";
      });
      

  },

  // extraReducers:{
  //     [register.pending]: (state, action) => {
  //         state.isSuccess=false;
  //         state.loading = true;
  //       },
  //       [register.fulfilled]: (state, action) => {

  //         state.loading = false;
  //         state.isSuccess=true;
  //         state.user = action.payload;
  //         const {message,...rest}=state.user;
  //         state.successMessage=message;

  //       },
  //       [register.rejected]: (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload.message;
  //         state.isError=true;
  //         state.message=action.payload.message;
  //       },
  // }
});

export const { logout, truly, setUser2,reset } = userSlice.actions;
export default userSlice.reducer;

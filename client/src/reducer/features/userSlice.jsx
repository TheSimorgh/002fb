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
      // console.log(error);
      // console.log(error.message);
      // console.log(error.response.data.message);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.message) ||
        error?.message ||
        error.toString();
      return rejectWithValue(error?.response?.data?.message);
      // return rejectWithValue(message);
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
export const activateUserAccount = createAsyncThunk(
  "user/activateUserAccount",
  async (userinfo,token,  { rejectWithValue }) => {
    try {
      axios;
      const response = await axios.post(`http://localhost:8000/active`,{token}, { headers: {Authorization: `Bearer ${userinfo.token}`,},});
      
      
      // Cookies.set("user", JSON.stringify(response.data));
      // Cookies.set("user", JSON.stringify({ ...user, verified: true }));

      // if(!response.ok) {
      //    throw new Error (response.data.message,response.status)
      // }
      // Cookies.set("user", JSON.stringify(response.data));
      console.log("activateUserAccount = createAsyncThunk");
      console.log(response.data);
      console.log("response");
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data.message);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.message) ||
        error?.message ||
        error.toString();      // return rejectWithValue(error.response.data.message);
      // return rejectWithValue(message);
      return rejectWithValue(error?.response?.data?.message);

    }
  }
);
// const activate1UserAccount = async () => {
//   try {
//     setLoading(true);
//     const { data } = await axios.post(
//       `${backend_url}/activate`,
//       { token },
//       {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       }
//     );
//     setSuccess(data.message);
//     Cookies.set("user", JSON.stringify({ ...user, verified: true }));
//     dispatch({
//       type: "VERIFY",
//       payload: true,
//     });

//     setTimeout(() => {
//       navigate("/");
//     }, 3000);
//   } catch (error) {
//     setError(error.response.data.message);
//     setTimeout(() => {
//       navigate("/");
//     }, 3000);
//   }
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingTruly:(state)=>{state.loading=true},
    reset:(state)=>{
      state.user= null
      state.isError= false
      state.isSuccess= false
      state.loading=false
      state.message= ""
      state.error= ""
      state.successMessage=""
    },
    user_verification:(state)=>{
      state.user.verify
    },
    activate:(state)=>{
      state.user.verify=true
      // Cookies.set("user", JSON.stringify({ ...state, verified: true }));
      Cookies.set("user", JSON.stringify( state.user ));

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
    updatePicture(state,action) {
      state.user.picture = action.payload;
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
        state.successMessage = null;
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
      }).addCase(activateUserAccount.pending, (state) => {
        state.isSuccess = false;
        state.loading = true;
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user.verified=true;
        // state.user=action.payload
        // const { message, ...rest } = state.user;
        // state.user = rest
        state.successMessage = action.payload;
      })
      .addCase(activateUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.message = action.payload;
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

export const { logout, truly, setUser2,reset,loadingTruly,user_verification,activate,updatePicture } = userSlice.actions;
export default userSlice.reducer;

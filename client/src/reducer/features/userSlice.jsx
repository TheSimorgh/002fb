/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../axios/CustomAxios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// const navigate =useNavigate()
// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))
const user =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const initialState = {
      user: user ? user : null,
     isError: false,
     isSuccess: false,
     loading: false,
     message: '',
     error:"",
     successMessage:"",
 
  }

//   const initial = {
//     user: user ? user : null,
//    isError: false,
//    isSuccess: false,
//    loading: false,
//    message: '',
//    error:"",
//    successMessage:"",

// }

// export const register = createAsyncThunk("user/register",async(userInfo),{rejectWithValue})=>{
//     try {
//         const {data}=await http.post(`http://localhost:8000/register`,userInfo)
//         const {message,...rest}=data
//         setTimeout(()=>{
//         Cookies.set("user", JSON.stringify(rest));
//         navigate("/login")
//         },1000)

//     } catch (error) {
        
//     }
// }

export const register = createAsyncThunk(
    "user/register",
    async (userInfo, { rejectWithValue }) => {
      try {
        const response = await http.post(`http://localhost:8000/register`,userInfo);
        // if (!response.ok) {
        //   return rejectWithValue(response.data.message);
        // }
        // if(!response.ok) throw new Error (response.data.message,response.status)
        const {message,...rest}=response.data
        Cookies.set("user", JSON.stringify(rest));

        return response.data;
      } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.response.data.message);
       // setLoading(false);
       // setError(error.response.data.message);
      //  const message =
      //  (error.response && error.response.data && error.response.data.message) ||
      //  error.message ||
      //  error.toString()
      // const message =error.response.data.message
          const message =
       (error.response && error.response.data && error.response.data.message) ||
       error.message  ||
       error.toString()
       // return rejectWithValue(error.response.data.message);
       return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const signin = createAsyncThunk(
    "user/signin",
    async (userInfo, { rejectWithValue }) => {
        try {
          const {data}=await http.post(`http://localhost:8000/register`,userInfo)
          Cookies.set("user", JSON.stringify(data));
          return data;

        } catch (error) {
   
          console.log(error);
          console.log(error.message);
          console.log(error.response.data.message);
         // setLoading(false);
         // setError(error.response.data.message);
        //  const message =
        //  (error.response && error.response.data && error.response.data.message) ||
        //  error.message ||
        //  error.toString()
        // const message =error.response.data.message
            const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message  ||
         error.toString()
         // return rejectWithValue(error.response.data.message);
         return rejectWithValue(error.response.data.message);
        }
      } 
  );
//   const registerSubmit = async () => {
//     try {
//       const {data}=await http.post(`http://localhost:8000/register`,userInfo)
//       setError("")
//       setSuccess(data.message);
//       const {message,...rest}=data
//       console.log(rest);
//       setTimeout(()=>{
//         dispatch(login(rest));
//         Cookies.set("user", JSON.stringify(rest));
//         navigate("/login")
//       },2000)
//       // console.log(1);
//     } catch (error) {
//       console.log(error.message);
//       setLoading(false)
//       setSuccess("")
//       setError(error.response.data.message)
//     }
//      };
// export const loginUser= createAsyncThunk('user/register', async () => {
    
// })
// export const logoutUser= createAsyncThunk('user/logoutUser', async () => {
// })
// export const updatePicture= createAsyncThunk('user/logoutUser', async () => {
// })
// export const verify= createAsyncThunk('user/verify', async () => {
// })

// export const register=createAsyncThunk("user/register",async(userInfo,thunkAPI)=>{
//     try {
//         const {data}=await http.post(`http://localhost:8000/register`,userInfo)
//     } catch (error) {
        
//     }
// })
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser2: (state, action) => {
            state.user = action.payload;
      
          },
          setError:(state,action)=>{
state.error=action.payload
          },
        // login(state,action){
        //     state.user===action.payload
        // }
        // ,logout(state,action){
        //     state.user=action.payload
        // } ,
        
        truly(state){
state.isSuccess=!state.isSuccess
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isSuccess=false;
            state.loading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading = false;
            state.isSuccess=true;
            state.user = action.payload;
            const {message,...rest}=state.user;
            state.successMessage=message;
         
        })
        .addCase(register.rejected,(state,action)=>{
       return{
        ...state,
        loading :false,
       isError:true,
      error :action.payload,
        message:action.payload,
       }
           
        }).addCase(signin.pending,(state)=>{
          state.isSuccess=false;
          state.loading = true;
      })
      .addCase(signin.fulfilled,(state,action)=>{
          state.loading = false;
          state.isSuccess=true;
          state.user = action.payload;
  
      })
      .addCase(signin.rejected,(state,action)=>{
          state.loading = false;
          state.isError=true;
          state.error = action?.payload;
          state.message=action?.payload;
      })
    }

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
})



export const { logout,truly,setUser2 } = userSlice.actions
export default userSlice.reducer

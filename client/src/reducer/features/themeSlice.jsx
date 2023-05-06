/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const theme= Cookies.get("darkTheme")? JSON.parse(Cookies.get("darkTheme")): false;
const initialState = {
  darkTheme:theme
  }

const themeSlice=createSlice({
    name:"themeSlice",
    initialState,
    reducers:{
      darkTheme_false(state) {
        Cookies.set("darkTheme", JSON.stringify(false));
        state.darkTheme =false;
      },
      darkTheme_true(state) {
        Cookies.set("darkTheme", JSON.stringify(true));
        state.darkTheme =true;
      },
    },
    extraReducers(builder) {
        
    }
})


export default themeSlice.reducer;
export const { darkTheme_true,darkTheme_false} = themeSlice.actions





import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    login_visible: false,
    home_visible:false,
    // home_visible2:true,
    // boom:"",
    
};

const togglesSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    //------------------------Login--------------------------------------

    loginToggleFun(state) {
      state.login_visible = !state.login_visible;
    },
    login_visible_false(state){
      state.login_visible=false
    },
    login_visible_true(state){
      state.login_visible=true
    },
    //------------------------Home--------------------------------------
    homeToggleFun(state) {
      state.home_visible = !state.home_visible;
    },
    home_visible_false(state){
      state.home_visible=false
    },
    home_visible_true(state){
      state.home_visible=true
    }
  },
});

export default togglesSlice.reducer;
export const { loginToggleFun,login_visible_false,login_visible_true,homeToggleFun ,home_visible_false,home_visible_true} = togglesSlice.actions

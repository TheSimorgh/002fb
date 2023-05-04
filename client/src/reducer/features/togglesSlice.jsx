import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    login_visible: false,
};

const togglesSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    loginToggleFun(state) {
      state.login_visible = !state.login_visible;
    },
    login_visible_false(state){
      state.login_visible=false
    },
    login_visible_true(state){
      state.login_visible=true
    }
  },
});

export default togglesSlice.reducer;
export const { loginToggleFun,login_visible_false,login_visible_true } = togglesSlice.actions

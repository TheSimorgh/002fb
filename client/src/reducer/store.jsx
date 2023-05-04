import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import togglesSlice from "./features/togglesSlice";


const store = configureStore({
    reducer: {
     user:userSlice,
     toggles:togglesSlice
    }
  })
  
  export default store
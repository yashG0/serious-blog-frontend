import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../redux/stores/authSlice.js";


export const store = configureStore({
	reducer: {auth: authSlice},
})
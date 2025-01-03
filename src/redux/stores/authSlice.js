import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		value: Boolean(localStorage.getItem("access_token")),
	},
	reducers: {
		changeStatus: (state, action) => {
			state.value = action.payload
		},
		setUserLoggedIn: (state) => {
			state.value = true;
		},
		setUserLoggedOut: (state) => {
			state.value = false;
		},
	}
})


export const {changeStatus, setUserLoggedIn, setUserLoggedOut} = authSlice.actions

export default authSlice.reducer
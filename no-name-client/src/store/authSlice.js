import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userData: undefined,
    isAdmin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.loggedIn = true;
            state.userData = action.payload;
            if (action.payload.isAdmin) state.isAdmin = true;
            else state.isAdmin = false;
        },
        logout(state) {
            state.loggedIn = false;
            state.isAdmin = false;
            state.userData = undefined;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

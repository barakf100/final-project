import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userData: undefined,
    isAdmin: false,
    type: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.loggedIn = true;
            state.userData = action.payload;
            state.type = action.payload.type;
            if (action.payload.isAdmin) state.isAdmin = true;
            else state.isAdmin = false;
        },
        logout(state) {
            state.loggedIn = false;
            state.isAdmin = false;
            state.type = "";
            state.userData = undefined;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

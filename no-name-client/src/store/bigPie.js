import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";
import usersSlice from "./async/usersSlice";
import userSlice from "./async/userSlice";
const store = configureStore({
    reducer: {
        authSlice,
        darkThemeSlice,
        usersSlice,
        userSlice,
    },
});

export default store;

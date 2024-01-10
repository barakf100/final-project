import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";
import usersSlice from "./async/usersSlice";
const store = configureStore({
    reducer: {
        authSlice,
        darkThemeSlice,
        usersSlice,
    },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../service/request/adminReq";

const getUsers = createAsyncThunk("users/getUsers", async () => {
    try {
        const res = await getAllUsers();
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
});
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: false,
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.users = payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error ? action.error.message : "An error occurred";
        },
    },
});

export default userSlice.reducer;
export { getUsers };

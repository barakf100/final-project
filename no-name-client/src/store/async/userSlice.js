import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../service/request/marryReq";
import { getMyId } from "../../service/storage/storageService";

const getUser = createAsyncThunk("users/getUser", async () => {
    try {
        const id = getMyId();
        const res = await getUserById(id);
        return res.user;
    } catch (err) {
        throw err;
    }
});
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: false,
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error ? action.error.message : "An error occurred";
        },
    },
});

export default userSlice.reducer;
export { getUser };

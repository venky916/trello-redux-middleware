// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null, // Initial state with no user logged in
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user details
        },
        clearUser: (state) => {
            state.user = null; // Clear the user details
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    showCart: false,
    isVerifying: true,
    error: null,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setShowCart: (state, action) => {
            state.showCart = action.payload;
        },
        setIsVerifying: (state, action) => {
            state.isVerifying = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setUser, setIsLoggedIn, setShowCart, setIsVerifying, setError } = appSlice.actions;

export default appSlice.reducer;
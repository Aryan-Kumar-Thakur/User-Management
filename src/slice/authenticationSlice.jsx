import { createSlice } from "@reduxjs/toolkit"

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        user:localStorage.getItem("token") ?
        JSON.parse(localStorage.getItem("token")) : null,
        loading: false,
        isAuthenticated: false,
    },
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.token;
        },
        REGISTER_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.token;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        REGISTER_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        }

    }
})

export const authenticationReducer = authenticationSlice.reducer;

export const { LOGIN_REQUEST, REGISTER_USER_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_SUCCESS,
    LOGIN_FAIL, REGISTER_USER_FAIL, CLEAR_ERRORS } = authenticationSlice.actions

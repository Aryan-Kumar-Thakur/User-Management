import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    loading: false,
    error: null
};

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        users: [],
        loading: true,
        error: null
    },
    reducers: {
        ALL_USERS_REQUEST: (state) => {
            state.loading = true;
        },
        ALL_USERS_SUCCESS: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
            state.usersCount = action.payload.total;
            state.resultPerPage = action.payload.per_page
        },
        ALL_USERS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const userSlice = createSlice({
    name: "profile",
    initialState: {
        user: {},
        changedUser:{},
        isDeleted: false,
        loading: false,
        error: null
    },
    reducers: {
        DELETE_USER_REQUEST: (state) => {
            state.loading = true;
        },
        UPDATE_USER_REQUEST: (state) => {
            state.loading = true;
        },
        DELETE_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        UPDATE_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.changedUser=action.payload;
        },
        DELETE_USER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_USER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_USER_RESET: (state) => {
            state.isDeleted = false;
        },
        UPDATE_USER_RESET: (state) => {
            state.user = {};
        }
    }
})

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        user: {},
        loading: true,
        error: null
    },
    reducers: {
        USER_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        USER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        USER_DETAILS_FAIL: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        }
    }
})


export const allUsersReducer = allUsersSlice.reducer;
export const userReducer = userSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;

export const { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } = allUsersSlice.actions

export const { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_RESET } = userSlice.actions

export const { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } = userDetailsSlice.actions
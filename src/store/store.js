import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from 'redux-thunk'
import { legacy_createStore as createStore } from 'redux'
import { authenticationReducer } from "../slice/authenticationSlice"
import { allUsersReducer, userDetailsReducer, userReducer } from "../slice/userSlice"

const initialState = {
    // user: localStorage.getItem("token") ?
    //         JSON.parse(localStorage.getItem("token")) : null,
}

const middleware = [thunk]
const rootReducer = {
    authentication: authenticationReducer,
    allUsers: allUsersReducer,
    profile: userReducer,
    userDetails: userDetailsReducer
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    // devTools: process.env.NODE_ENV !== 'production'
})

export default store
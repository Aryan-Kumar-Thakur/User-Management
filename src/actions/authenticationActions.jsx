import axios from "axios"
import {
    LOGIN_REQUEST, REGISTER_USER_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_SUCCESS,
    LOGIN_FAIL, REGISTER_USER_FAIL, CLEAR_ERRORS
} from "../slice/authenticationSlice"

import { BaseUrl } from "../constants/BaseUrl";


const API_URI = `${BaseUrl}`;

//login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(LOGIN_REQUEST())

            const response = await fetch(`${BaseUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }

            const data = await response.json()
            dispatch(LOGIN_SUCCESS(data))

            localStorage.setItem("token", JSON.stringify(data.token));
        } catch (error) {
            dispatch(LOGIN_FAIL(error.message))
        }
    }
}

//register
export const register = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(REGISTER_USER_REQUEST())

            const response = await fetch(`${BaseUrl}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userData
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Register failed");
            }

            const data = await response.json()
            localStorage.setItem("token", JSON.stringify(data.token));
            dispatch(REGISTER_USER_SUCCESS(data))
        } catch (error) {
            dispatch(REGISTER_USER_FAIL(error.message))
        }
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};
import axios from "axios"
import { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } from "../slice/userSlice"
import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_RESET
} from "../slice/userSlice"
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "../slice/userSlice"
import { BaseUrl } from "../constants/BaseUrl";


export const getallUsers = (currentPage = 1) => {
    return async (dispatch) => {
        try {
            dispatch(ALL_USERS_REQUEST());

            let link = `${BaseUrl}/api/users?page=${currentPage}`

            const response = await fetch(link, {
                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "USERS NOT FOUND");
            }

            const data = await response.json()
            dispatch(ALL_USERS_SUCCESS(data));
        } catch (error) {
            dispatch(ALL_USERS_FAIL(error.message));
        }
    };
};

export const getUserDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch(USER_DETAILS_REQUEST());

            const response = await fetch(`${BaseUrl}/api/users/${id}`, {
                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "USERS NOT FOUND");
            }

            const data = await response.json()

            dispatch(USER_DETAILS_SUCCESS(data.data));
        } catch (error) {
            dispatch(USER_DETAILS_FAIL(error.message));
        }
    }
};

export const updateUser = (id, first_name, last_name, email) => {
    return async (dispatch) => {
        try {
            dispatch(UPDATE_USER_REQUEST());

            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

            const response = await fetch(`${BaseUrl}/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "USERS NOT FOUND");
            }

            const data = await response.json()

            dispatch(UPDATE_USER_SUCCESS(data));
        } catch (error) {
            dispatch(UPDATE_USER_FAIL(error.message));
        }
    }
}

export const deleteUser = (id) =>{
    return async (dispatch) => {
        try {
            dispatch(DELETE_USER_REQUEST());

            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

            const response = await fetch(`${BaseUrl}/api/users/${id}`, {
                method: "DELETE",
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "USERS NOT FOUND");
            }

            const data = response.ok

            dispatch(DELETE_USER_SUCCESS(data));
        } catch (error) {
            dispatch(UPDATE_USER_FAIL(error.message));
        }
    }
}
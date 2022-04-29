import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_BOOKS_BY_CATEGORY = 'GET_BOOKS_BY_CATEGORY';
export const GET_BOOKS_BY_ID = 'GET_BOOKS_BY_ID';
export const GET_BOOKS_BY_USER = 'GET_BOOKS_BY_USER';

export const getBooksByCategory = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBooksByCategory/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_BOOKS_BY_CATEGORY,
                books: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_BOOKS_BY_CATEGORY,
                books: [],
            });
            
            return await Promise.reject(error.response);
        }
    }
};

export const getBooksByID = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBooksByID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_BOOKS_BY_ID,
                books: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const getBooksByUser = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBooksByUser/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_BOOKS_BY_USER,
                books: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_BOOKS_BY_USER,
                books: [],
            });
            
            return await Promise.reject(error.response);
        }
    }
};
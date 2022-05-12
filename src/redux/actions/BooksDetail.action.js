import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_BOOKS_DETAIL_BY_ID = 'GET_BOOKS_DETAIL_BY_ID';
export const GET_PARTS_BY_ID = 'GET_PARTS_BY_ID';

export const getBooksDetailByID = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBooksDetailByID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_BOOKS_DETAIL_BY_ID,
                books: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_BOOKS_DETAIL_BY_ID,
                books: [],
            });
            return await Promise.reject(error.response);
        }
    }
};

export const getPartsByID = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getPartsByID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_PARTS_BY_ID,
                books: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_PARTS_BY_ID,
                books: [],
            });
            return await Promise.reject(error.response);
        }
    }
};

export const addBookDetail = (no, title, desc, id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/addBookDetail`, {
                PartNo: no,
                PartName: title,
                PartContain: desc,
                BookID: id
            }, 'POST', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                },
            });

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const updateBookDetail = (id, book) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/updateBookDetail/${id}`, {
                book
            }, 'PATCH', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                },
            });

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const deleteBookDetail = (id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
           const res = await Api(`/deleteBookDetail/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'DELETE');

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const deleteAllBookDetail = (id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
           const res = await Api(`/deleteAllBookDetail/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'DELETE');

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};
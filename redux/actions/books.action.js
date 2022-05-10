import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_BOOKS_BY_CATEGORY = 'GET_BOOKS_BY_CATEGORY';
export const GET_BOOKS_BY_ID = 'GET_BOOKS_BY_ID';
export const GET_BOOKS_BY_USER = 'GET_BOOKS_BY_USER';
export const GET_BOOKS_BY_BOOK_ID = 'GET_BOOKS_BY_BOOK_ID';
export const DELETE_BOOKS_PICS = 'DELETE_BOOKS_PICS';

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

export const getBooksByBookID = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBooksByBookID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_BOOKS_BY_BOOK_ID,
                books: res.data,
            });

            return await Promise.resolve(res.data);
        } catch (error) {         
            return await Promise.reject(error.response);
        }
    }
};

export const getBookNameByUser = () => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getBookNameByUser/${userData.id}`, {
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

export const addBook = (img, title, desc, cate) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/addBook`, {
                BookName: title,
                Description: desc,
                BookPic: img,
                CategoryID: cate,
                UserID: userData.id
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

export const updateBook = (id, book) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/updateBook/${id}`, {
                book,
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

export const deleteBook = (id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
           const res = await Api(`/deleteBook/${id}`, {
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

export const deleteBooksPics = () => {
    return {
        type: DELETE_BOOKS_PICS,
        books: []
    }
}
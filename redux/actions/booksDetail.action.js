import Api from "../../services/Api";
import { getAsyncData } from "./users.action";

export const GET_BOOKS_DETAIL_BY_ID = 'GET_BOOKS_DETAIL_BY_ID';

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
            return await Promise.reject(error.response);
        }
    }
};
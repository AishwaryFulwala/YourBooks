import Api from "../../services/Api";
import { getAsyncData } from "./users.action";

export const GET_SEARCH_HISTORY = 'GET_SEARCH_HISTORY';

export const getSearchHistoryByID = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getSearchHistoryByID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_SEARCH_HISTORY,
                history: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const deleteSearchHistory = (id, history) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/deleteSearchHistory/${id}`,{
                history,           
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
import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_SEARCH_HISTORY = 'GET_SEARCH_HISTORY';
export const GET_SEARCH_DATA = 'GET_SEARCH_DATA';

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

export const updateSearchHistory = (id, history) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/updateSearchHistory/${id}`,{
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

export const getSearchData = (data) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getSearchData/${data}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_SEARCH_DATA,
                data: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_SEARCH_DATA,
                data: {},
            });

            return await Promise.reject(error.response);
        }
    }
};

export const getEmpty = () => {
    return {
        type: GET_SEARCH_DATA,
        data: {},
    }
}
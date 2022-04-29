import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_READING_LIST_BY_ID = 'GET_READING_LIST_BY_ID';
export const CHANGE = 'CHANGE';

export const getReadingListByID = (id) => {
  
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getReadingListByID/${id}/${userData.id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_READING_LIST_BY_ID,
                list: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_READING_LIST_BY_ID,
                list: {},
            });

            return await Promise.reject(error.response);
        }
    }
};

export const addReadingList = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/addReadingList`, {
                BookID: id,
                UserID: userData.id,
            }, 'POST', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            });
            
            dispatch({
                type: CHANGE,
                list: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const deleteReadingList = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/deleteReadingList/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'DELETE');
            
            dispatch({
                type: CHANGE,
                list: {},
            });

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};
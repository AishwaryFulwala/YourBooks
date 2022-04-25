import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../services/Api";

export const GET_READING_LIST_BY_ID = 'GET_READING_LIST_BY_ID';
export const CHANGE = 'CHANGE';

export const getReadingListByID = (id) => {
  
    return async (dispatch) => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

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
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

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
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

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
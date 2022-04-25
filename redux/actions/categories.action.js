import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../services/Api";

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY = 'GET_CATEGORY';

export const getCategories = () => {
    return async (dispatch) => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

        try {
            const res = await Api(`/getCategories`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_CATEGORIES,
                categories: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const getCategoryByID = (id) => {
    return async (dispatch) => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

        try {
            const res = await Api(`/getCategoryByID/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_CATEGORY,
                category: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};
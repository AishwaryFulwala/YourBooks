import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../services/Api";

export const GET_AVG_RATING = 'GET_AVG_RATING';
export const GET_RATING_BY_BOOK = 'GET_RATING_BY_BOOK';

export const addRating = (rate, review, bid) => {
    return async () => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

        try {
            const res = await Api(`/addRating`, {
                Rating: rate,
                Review: review,
                ReviewDate: new Date().toISOString(),
                BookID: bid,
                UserID: userData.id,
            }, 'PATCH', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
}

export const getAvgRating = (id) => {
    return async (dispatch) => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

        try {
            const res = await Api(`/getAvgRating/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');
            
            dispatch({
                type: GET_AVG_RATING,
                rating: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_AVG_RATING,
                rating: [],
            });

            return await Promise.reject(error.response);
        }
    }
};

export const getRatingByBook = (id) => {
    return async (dispatch) => {
        let user = await AsyncStorage.getItem('@userData');
        const userData = JSON.parse(user);

        try {
            const res = await Api(`/getRatingByBook/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_RATING_BY_BOOK,
                rating: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_RATING_BY_BOOK,
                rating: [],
            });

            return await Promise.reject(error.response);
        }
    }
};
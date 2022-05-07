import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_AVG_RATING = 'GET_AVG_RATING';
export const GET_RATING_BY_BOOK = 'GET_RATING_BY_BOOK';

export const addRating = (rate, review, bid) => {
    return async () => {
        const userData = await getAsyncData();

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
        const userData = await getAsyncData();

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
        const userData = await getAsyncData();

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

export const deleteRatingByID = (id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/deleteRatingByID/${id}`, {
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
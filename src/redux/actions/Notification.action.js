import Api from "../../services/Api";
import { getAsyncData } from "./Users.action";

export const GET_NOTIFICATION_BY_ID = 'GET_NOTIFICATION_BY_ID';

export const addNotification = (title, body, bid, uid) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/addNotification`, {
                NotificationTitle: title,
                NotificationBody: body,
                NotificationDate: new Date().toISOString(),
                BookID: bid,
                UserID: uid,
            }, 'POST', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const addFirebaseNotification = (title, body, bid) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/addFirebaseNotification`, {
                NotificationTitle: title,
                NotificationBody: body,
                BookID: bid
            }, 'POST', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const getNotificationByID = () => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getNotificationByID/${userData.id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_NOTIFICATION_BY_ID,
                noti: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            dispatch({
                type: GET_NOTIFICATION_BY_ID,
                noti: [],
            });

            return await Promise.reject(error.response);
        }
    }
};

export const deleteNotificationByID = (id) => {
    return async () => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/deleteNotificationByID/${id}`, {
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
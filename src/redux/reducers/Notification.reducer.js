import { GET_NOTIFICATION_BY_ID } from '../actions/Notification.action';
import { stateInit } from '../states/InitState';

const NotificationReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_BY_ID:
            return {
                getNotificationData: [
                    ...action.noti,
                ]
            }
        
        default:
            return state;
    }
};

export default NotificationReducer;
import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { getNotificationByID } from '../redux/actions/Notification.action';

const NotificationCount = (props) => {
    const noti = useSelector((state) => state?.notifications?.getNotificationData);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getNotificationByID());
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        load();        
    }, []);

    return (
        <View>
            {
                !noti?.some(n => n?._id?.Status === true) ?
                    <IconM
                        name={props.focused ? 'bell' : 'bell-outline'}
                        size={props.focused ? 30 : 25}
                        color={props.color}
                        style={{ marginTop: 4 }}
                    />
                :
                    <IconM
                        name={props.focused ? 'bell-badge' : 'bell-badge-outline'}
                        size={props.focused ? 30 : 25}
                        color={props.color}
                        style={{ marginTop: 4 }}
                    />
            }
        </View>
    );
};

export default NotificationCount;
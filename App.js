import React, { useEffect, useRef, useState } from 'react';
import { LogBox, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import SplashScreen from "react-native-splash-screen";

import { Provider } from "react-redux";

import BookNavigation from './src/navigation/BookNavigation';
import CustomErrorToast from './src/components/CustomErrorToast';
import store from './src/redux/store/Config';

const App = () => {
    LogBox.ignoreAllLogs();

    const [navigationReady,setNavigationReady] = useState(false);
    const [notificationData,setNotificationData] = useState(null)

    useEffect(()=>{
        if(notificationData && navigationReady) {
            navRef?.current?.navigate('Notification')
        }
    },[navigationReady,notificationData])

    const navRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 300);
    }, []);

    useEffect(() => {
        checkPermission = async () => {
            const check = await messaging().requestPermission();

            if(check === 1 ||  check === 2) {
                messaging().setBackgroundMessageHandler(async () => {});
                messaging().onNotificationOpenedApp(notification =>{;
                    setNotificationData(notification);
                })
                if(Platform.OS === 'android'){
                    messaging().getInitialNotification().then((notifiaction)=>{
                        setNotificationData(notifiaction);
                    });
                }
            }
            else 
                Alert.alert('Alert', 'Please Provide Notification Permission', [{ text: 'Okay' }]);
        }

        checkPermission();
    }, []);

    return (
        <Provider store={store}>
            <BookNavigation 
                navRef={navRef} 
                onReady={() => {
                    setNavigationReady(true);
                }}
            />
            <CustomErrorToast />
        </Provider>
    );
};

export default App;
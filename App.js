import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { LogBox } from 'react-native';

import BookNavigation from './navigation/BookNavigation';
import store from './redux/store/Config';

const App = () => {
    LogBox.ignoreAllLogs();

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 300);
    }, []);

    useEffect(() => {
        checkPermission = async () => {
            await messaging().requestPermission();
            const check = await messaging().hasPermission();

            if(check) {
                const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                    Alert.alert('A new FCM message arrived!');
                    console.log('A new FCM message arrived!',JSON.stringify(remoteMessage));
                });

                return unsubscribe;
            }
        }

        checkPermission();
    }, []);

    return (
        <Provider store={store}>
            <BookNavigation />
        </Provider>
    );
};

export default App;

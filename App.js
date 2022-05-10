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
            const check = await messaging().requestPermission();

            if(check === 1 ||  check === 2) {
                return messaging().setBackgroundMessageHandler(() => {});
            }
            else {
                Alert.alert('Alert', 'Please Provide Notification Permission', [{ text: 'Okay' }]);
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

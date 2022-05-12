import React, { useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { LogBox } from 'react-native';

import BookNavigation from './src/navigation/BookNavigation';
import store from './src/redux/store/Config';

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

            if(check === 1 ||  check === 2)
                messaging().setBackgroundMessageHandler(async () => {});
            else 
                Alert.alert('Alert', 'Please Provide Notification Permission', [{ text: 'Okay' }]);
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

import React, { useEffect } from 'react';
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

    return (
        <Provider store={store}>
            <BookNavigation />
        </Provider>
    );
};

export default App;

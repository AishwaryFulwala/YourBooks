import React, { useEffect } from 'react';
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";

import BookNavigation from './navigation/BookNavigation';
import store from './redux/store/config';

const App = () => {
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

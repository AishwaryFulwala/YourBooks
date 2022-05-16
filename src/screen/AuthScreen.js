import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useTheme } from "@react-navigation/native";

import PageLoader from "../components/PageLoader";

const AuthScreen = (props) => {
    const Colors = useTheme().colors;
    
    useEffect(() => {
        const tryLog = async () => {
            const userData = await AsyncStorage.getItem('@userData');

            if(!userData) {
                props.navigation.dispatch(
                    StackActions.replace('Sign')
                );
                return;
            }

            props.navigation.dispatch(
                StackActions.replace('Tab')
            );
        };

        tryLog();
    }, []);

    return (
        <View style={styles(Colors).body}>
            <PageLoader />
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
});

export default AuthScreen;
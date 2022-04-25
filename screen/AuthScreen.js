import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackActions } from "@react-navigation/native";

import Colors from "../constnats/Colors";

const AuthScreen = (props) => {
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
    }, );


    return (
        <View style={styles.body}>
            <ActivityIndicator
                size='large'
                color={Colors.fontColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bodyColor,
    },
});

export default AuthScreen;
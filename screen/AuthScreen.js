import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import AnimatedLoader from 'react-native-animated-loader';
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
            {/* <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.lottie}
                speed={1}
                // source={require("../assets/image/B3.gif")}
            /> */}
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
    lottie: {
        width: 100,
        height: 100,
    },
});

export default AuthScreen;
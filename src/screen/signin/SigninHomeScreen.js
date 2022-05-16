import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import LottieView from 'lottie-react-native';

import { useTheme } from '@react-navigation/native';

import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SigninHomeScreen = (props) => {
    const Colors = useTheme().colors;

    return (
        <ScrollView contentContainerStyle={styles(Colors).scrollColor}>
            <View style={styles(Colors).body}>
                <LottieView
                    source={require('../../assets/image/homeCover.json')}
                    style={styles(Colors).lottie}
                    autoPlay
                    loop
                />
                <Text style={styles(Colors).txtWelcome} numberOfLines={2}>Welcome to, {'\n'}Your Books</Text>
                <Text style={styles(Colors).txtRead}>Read and write stories in every category</Text>
                <TouchableOpacity
                    style={styles(Colors).btn}
                    onPress={() => {
                        props.navigation.navigate('Signup');
                    }}
                >
                    <Text style={styles(Colors).btnTxt}>Join for free</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('Signin');
                    }}
                >
                    <Text style={styles(Colors).txtAc}>Already have an account?{' '}
                        <Text style={styles(Colors).txtSign}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = (Colors) => StyleSheet.create({
    scrollColor: {
        backgroundColor: Colors.bodyColor,
        flex: 1,
    },
    lottie: {
        alignSelf: 'center',
        width: wWidth,
        height: wHeight * 0.4,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.bodyColor
    },
    img: {
        height: wHeight * 0.35,
        width: wWidth,
    },
    txtWelcome: {
        color: Colors.fontColor,
        fontFamily: Fonts.titleFont,
        fontSize: wWidth * 0.1,
        marginTop: wHeight * 0.05,
        marginLeft: wWidth * 0.1,
    },
    txtRead: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        marginLeft : wWidth * 0.1,
        marginTop: wHeight * 0.02,
    },
    btn: {
        width: wWidth * 0.85,
        height: wHeight * 0.06,
        borderRadius: 50,
        backgroundColor: Colors.titleColor,
        marginHorizontal:  wWidth * 0.07,
        marginTop: wHeight * 0.05,
        justifyContent: 'center',
    },
    btnTxt: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        textAlign: 'center',
    },
    txtAc: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        textAlign: 'center',
        marginTop: wHeight * 0.03,
        paddingVertical: wHeight * 0.01,
    },
    txtSign: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textDecorationColor: Colors.bookColor,
    },
});

export default SigninHomeScreen;
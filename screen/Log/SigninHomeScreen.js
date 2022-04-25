import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SigninHomeScreen = (props) => {
    return (
        <ScrollView style={styles.scrollColor}>
            <View style={styles.body}>
                <Image source={require('../../assets/image/HomeCover.webp')} style={styles.img} />
                <Text style={styles.txtWelcome} numberOfLines={2}>Welcome to, {'\n'}Your Books</Text>
                <Text style={styles.txtRead}>Read and write stories in every category</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        props.navigation.navigate('Signup');
                    }}
                >
                    <Text style={styles.btnTxt}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.txtAc}>Already have an account?
                    <Text
                        style={styles.txtSign}
                        onPress={() => {
                            props.navigation.navigate('Signin');
                        }}
                    >{' '}Sign In</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollColor: {
        backgroundColor: Colors.bodyColor
    },
    body: {
        flex: 1,
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
        borderColor: Colors.titleColor,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.titleColor,
        marginHorizontal:  wWidth * 0.07,
        marginTop: wHeight * 0.05,
        justifyContent: 'center',
    },
    btnTxt: {
        color: Colors.btnFontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        textAlign: 'center',
    },
    txtAc: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        marginLeft : wWidth * 0.09,
        marginTop: wHeight * 0.05,
        
    },
    txtSign: {
        fontStyle: 'italic',
    },
});

export default SigninHomeScreen;

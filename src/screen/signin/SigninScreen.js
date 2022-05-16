import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StackActions, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import IconI from 'react-native-vector-icons/Ionicons'

import { signin, updateUser } from '../../redux/actions/Users.action';

import Fonts from '../../constnats/Fonts';

import Input from '../../components/Input';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SigninScreen = (props) => {
    const Colors = useTheme().colors;

    const [ isPwd, setIsPwd ] = useState(true);

    const [ email, setemail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const emailHandler = (txt) => {
        setemail(txt);
    };

    const pwdHandler = (txt) => {
        setPassword(txt);
    };

    const checkPermission = async () => {
        const check = await messaging().requestPermission();

        if(check === 1 ||  check === 2) {
            const token = await messaging().getToken();
            try {
                await dispatch(updateUser({Token: token}));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }
        else {
            Alert.alert('Alert', 'Please Provide Notification Permission', [{ text: 'Okay' }]);
        }
    };

    const signInHandler = async () => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        if(!email.match(emailRegex) || email === ''){
            Toast.show({
                type: 'errorToast',
                text1: 'Email is not valid.',
                position: 'bottom'
            });
            return
        }

        if(password === ''){
            Toast.show({
                type: 'errorToast',
                text1: 'Password can\'t be empty.',
                position: 'bottom'
            });
            return
        }

        try {
            await dispatch(signin(email, password));
            
            checkPermission();

            props?.navigation?.dispatch(
                StackActions.replace('Tab')
            );
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={100}>
            <View style={styles(Colors).body}>
                <Text style={styles(Colors).helloTitle}>Hello Again!</Text>
                <Text style={styles(Colors).welTitle}>Welcome Back you've been missed!</Text>
                <View>
                    <Input
                        name='Email'
                        iconName = 'envelope'
                        value={email}
                        onChangeText={emailHandler}
                        emailCap={'none'}
                    />
                    <Input
                        name='Password'
                        iconName = 'lock'
                        value={password}
                        onChangeText={pwdHandler}
                        pwd={isPwd}
                    >
                        {
                            isPwd ?
                                <IconI
                                    name='eye-outline'
                                    color={Colors.fontColor}
                                    size={20}
                                    onPress={() => setIsPwd(!isPwd)}
                                />
                            :
                                <IconI
                                    name='eye-off-outline'
                                    color={Colors.fontColor}
                                    size={20}
                                    onPress={() => setIsPwd(!isPwd)}
                                />
                        }
                    </Input>
                </View>
                <TouchableOpacity
                    style={styles(Colors).btn}
                    onPress={signInHandler}
                >
                    <Text style={styles(Colors).btnTxt}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles(Colors).btnAc}
                    onPress={() => {
                        props?.navigation?.dispatch(
                            StackActions.replace('Signup')
                        );
                    }}
                >
                    <Text style={styles(Colors).txtAc}>Don't have an account?{' '}
                        <Text style={styles(Colors).txtSign}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = (Colors) => StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
    helloTitle: {
        alignSelf: 'flex-start',
        color: Colors.fontColor,
        fontFamily: Fonts.titleFont,
        fontSize: wWidth * 0.08,
        marginTop: wHeight * 0.03,
        marginLeft: wWidth * 0.1,
    },
    welTitle: {
        alignSelf: 'flex-start',
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        marginTop: wHeight * 0.01,
        marginBottom: wHeight * 0.05,
        marginLeft: wWidth * 0.1,
        lineHeight: wHeight * 0.03,
    },
    btn: {
        width: wWidth * 0.8,
        height: wHeight * 0.05,
        borderRadius: 10,
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
    btnAc: {
        width: wWidth * 0.9,
        marginTop: wHeight * 0.05,
    },
    txtAc: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        textAlign: 'center',
        paddingVertical: wHeight * 0.01,
    },
    txtSign: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textDecorationColor: Colors.bookColor,
    },
});

export default SigninScreen;
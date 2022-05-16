import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';

import { StackActions, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import IconI from 'react-native-vector-icons/Ionicons';

import { signup } from '../../redux/actions/Users.action';

import Fonts from '../../constnats/Fonts';

import Input from '../../components/Input';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SignupScreen = (props) => {
    const Colors = useTheme().colors;

    const [ isPwd, setIsPwd ] = useState(true);
    const [ isCPwd, setCPwd ] = useState(true);

    const [ userName, setUserName ] = useState('');
    const [ email, setemail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const dispatch = useDispatch();

    const signUpHandler = async () => {
        if(userName === ''){
            Toast.show({
                type: 'errorToast',
                text1: 'User Name can\'t be empty.',
                position: 'bottom'
            });
            return
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        if(!email.match(emailRegex) || email === ''){
            Toast.show({
                type: 'errorToast',
                text1: 'Email is not valid.',
                position: 'bottom'
            });
            return
        }

        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
        if(!password.match(pwdRegex) || password === ''){
            Toast.show({
                type: 'errorToast',
                text1: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters.',
                position: 'bottom'
            });
            return
        }

        if(!confirmPassword.match(password)){
            Toast.show({
                type: 'errorToast',
                text1: 'Confirm Password must be same as password.',
                position: 'bottom'
            });
            return
        }
    
        dispatch(signup(userName, email, password))
        .then(() => {
            setUserName('');
            setemail('');
            setPassword('');
            setConfirmPassword('');

            props?.navigation?.dispatch(
                StackActions.replace('Signin')
            );
        })
        .catch ((error) => {
           Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        });  
    };

    const userHandler = (txt) => {
        setUserName(txt);        
    };
    
    const emailHandler = (txt) => {
        setemail(txt);
    };

    const pwdHandler = (txt) => {
        setPassword(txt);
    };

    const confirmPwdHandler = (txt) => {
        setConfirmPassword(txt);
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={100}>
            <View style={styles(Colors).body}>
                <Text style={styles(Colors).helloTitle}>Create Account.</Text>
                <Text style={styles(Colors).welTitle}>Share your thoughts with the world from today.</Text><View>
                    <Input
                        name='User Name'
                        iconName = 'note'
                        value={userName}
                        onChangeText={userHandler}
                    />
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
                    <Input
                        name='Confirm Password'
                        iconName = 'lock'
                        value={confirmPassword}
                        onChangeText={confirmPwdHandler}
                        pwd={isCPwd}
                    >
                        {
                            isCPwd ?
                                <IconI
                                    name='eye-outline'
                                    color={Colors.fontColor}
                                    size={20}
                                    onPress={() => setCPwd(!isCPwd)}
                                />
                            :
                                <IconI
                                    name='eye-off-outline'
                                    color={Colors.fontColor}
                                    size={20}
                                    onPress={() => setCPwd(!isCPwd)}
                                />
                        }
                    </Input>
                </View>
                <TouchableOpacity
                    style={styles(Colors).btn}
                    onPress={signUpHandler}
                >
                    <Text style={styles(Colors).btnTxt}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles(Colors).btnAc}
                    onPress={() => {
                        props?.navigation?.dispatch(
                            StackActions.replace('Signin')
                        );
                    }}
                >
                    <Text style={styles(Colors).txtAc}>Already have an account?{' '}
                        <Text style={styles(Colors).txtSign}>Sign In</Text>
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

export default SignupScreen;
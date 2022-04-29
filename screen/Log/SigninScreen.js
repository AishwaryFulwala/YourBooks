import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';

import { StackActions } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import IconI from 'react-native-vector-icons/Ionicons'

import * as UsersActions from '../../redux/actions/Users.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import Input from '../../components/Input';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SigninScreen = (props) => {
    const [ isPwd, setIsPwd ] = useState(true);

    const [ email, setemail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ msg, setMsg ] = useState({});

    const dispatch = useDispatch();

    const emailHandler = (txt) => {
        setemail(txt);
    };

    const pwdHandler = (txt) => {
        setPassword(txt);
    };

    const signInHandler = async () => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        if(!email.match(emailRegex) || email === ''){
            setMsg({
                id: 'email',
                error: 'Email is not valid.'
            });
            return
        }
        else 
            setMsg({
                id: 'email',
                error: ''
            });

        if(password === ''){
            setMsg({
                id: 'password',
                error: 'Password can\'t be empty.'
            });
            return
        }
        else 
            setMsg({
                id: 'password',
                error: ''
            });

        try {
            const res = await dispatch(
                UsersActions.signin(email, password)
            );
            
            props?.navigation?.dispatch(
                StackActions.replace('Tab')
            );
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    return (
        <ScrollView style={styles.scrollColor}>
            <View style={styles.body}>
                <Text style={styles.title}>Sign in</Text>
                <View style={styles.box}>
                    <Input
                        name='Email'
                        iconCom = 'Entypo'
                        iconName = 'email'
                        value={email}
                        onChangeText={emailHandler}
                        msg={msg.id === 'email' && msg.error !== '' && msg.error}
                        emailCap={'none'}
                    />
                    <Input
                        name='Password'
                        iconCom = 'EvilIcons'
                        iconName = 'lock'
                        size={30}
                        value={password}
                        onChangeText={pwdHandler}
                        pwd={isPwd}
                        msg={msg.id === 'password' && msg.error !== '' && msg.error}
                    >
                        {
                            isPwd ?
                                <IconI
                                    name='eye-outline'
                                    color={Colors.bodyColor}
                                    size={20}
                                    onPress={() => {
                                        setIsPwd(!isPwd);
                                    }}
                                />
                            :
                                <IconI
                                    name='eye-off-outline'
                                    color={Colors.bodyColor}
                                    size={20}
                                    onPress={() => {
                                        setIsPwd(!isPwd);
                                    }}
                                />
                        }
                    </Input>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={signInHandler}
                    >
                        <Text style={styles.btnTxt}>Sign In</Text>
                    </TouchableOpacity>
                    
                </View>
                <Text style={styles.txtAc}>Don't have an account?
                    <Text
                        style={styles.txtSign}
                        onPress={() => {
                            props?.navigation?.dispatch(
                                StackActions.replace('Signup')
                            );
                        }}
                    >{' '}Sign Up</Text>
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
        alignItems: 'center',
        backgroundColor: Colors.bodyColor
    },
    title: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.07,
        marginVertical: wHeight * 0.05
    },
    box: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.fontColor,
        shadowColor: Colors.fontColor,
        shadowOpacity: 0.8,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 8,
        elevation: 50,
        backgroundColor: Colors.fontColor,
        width: wWidth * 0.9,
        marginTop: wHeight * 0.05,
    },
    btn: {
        width: wWidth * 0.75,
        height: wHeight * 0.05,
        borderColor: Colors.titleColor,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.titleColor,
        marginHorizontal:  wWidth * 0.07,
        marginTop: wHeight * 0.06,
        marginBottom: wHeight * 0.03,
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
        textAlign: 'center',
        marginTop: wHeight * 0.08,
    },
    txtSign: {
        fontStyle: 'italic',
    },
});

export default SigninScreen;

import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';

import { StackActions } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import IconI from 'react-native-vector-icons/Ionicons';

import * as UsersActions from '../../redux/actions/users.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import Input from '../../components/Input';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SignupScreen = (props) => {
    const [ isPwd, setIsPwd ] = useState(true);
    const [ isCPwd, setCPwd ] = useState(true);

    const [ userName, setUserName ] = useState('');
    const [ contactNo, setContactNo ] = useState('');
    const [ email, setemail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ msg, setMsg ] = useState({});

    const dispatch = useDispatch();

    const signUpHandler = async () => {
        if(userName === ''){
            setMsg({
                id: 'userName',
                error: 'User Name can\'t be empty.'
            });
            return
        }
        else 
            setMsg({
                id: 'userName',
                error: ''
            });

        const cnoRegex = /^[6-9]\d{9}$/g;
        if(!contactNo.match(cnoRegex) || contactNo === ''){
            setMsg({
                id: 'contactNo',
                error: 'Contact No is not valid.'
            });
            return
        }
        else 
            setMsg({
                id: 'contactNo',
                error: ''
            });

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

        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
        if(!password.match(pwdRegex) || password === ''){
            setMsg({
                id: 'password',
                error: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters.'
            });
            return
        }
        else 
            setMsg({
                id: 'password',
                error: ''
            });

        if(!confirmPassword.match(password)){
            setMsg({
                id: 'cpassword',
                error: 'Confirm Password must be same as password.'
            });
            return
        }
        else 
            setMsg({
                id: 'cpassword',
                error: ''
            });
    
        dispatch(
            UsersActions.signup(userName, contactNo, email, password)
        )
        .then((res) => {
            Alert.alert('User Created!', 'Successfully created.', [{ text: 'Okay' }]);
            setMsg({});
            setUserName('');
            setContactNo('');
            setemail('');
            setPassword('');
            setConfirmPassword('');
        })
        .catch ((error) => {
           Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        });  
    };

    const userHandler = (txt) => {
        setUserName(txt);        
    };
    
    const noHandler = (txt) => {
        setContactNo(txt);
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
        <ScrollView style={styles.scrollColor}>
            <View style={styles.body}>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.box}>
                    <ScrollView>
                        <Input
                            name='User Name'
                            iconCom = 'SimpleLineIcons'
                            iconName = 'note'
                            value={userName}
                            onChangeText={userHandler}
                            msg={msg.id === 'userName' && msg.error !== '' && msg.error}
                        />
                        <Input
                            name='Contact No'
                            iconCom = 'SimpleLineIcons'
                            iconName = 'phone'
                            value={contactNo}
                            onChangeText={noHandler}
                            msg={msg.id === 'contactNo' && msg.error !== '' && msg.error}
                        />
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
                        <Input
                            name='Confirm Password'
                            iconCom = 'EvilIcons'
                            iconName = 'lock'
                            size={30}
                            value={confirmPassword}
                            onChangeText={confirmPwdHandler}
                            pwd={isCPwd}
                            msg={msg.id === 'cpassword' && msg.error !== '' && msg.error}
                        >
                            {
                                isCPwd ?
                                    <IconI
                                        name='eye-outline'
                                        color={Colors.bodyColor}
                                        size={20}
                                        onPress={() => {
                                            setCPwd(!isCPwd);
                                        }}
                                    />
                                :
                                    <IconI
                                        name='eye-off-outline'
                                        color={Colors.bodyColor}
                                        size={20}
                                        onPress={() => {
                                            setCPwd(!isCPwd);
                                        }}
                                    />
                            }      
                        </Input>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={signUpHandler}
                        >
                            <Text style={styles.btnTxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Text style={styles.txtAc}>Already have an account?
                    <Text
                        style={styles.txtSign}
                        onPress={() => {
                            props?.navigation?.dispatch(
                                StackActions.replace('Signin')
                            );
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
        height: wHeight * 0.5,
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
        justifyContent: 'center',
        marginBottom: wHeight * 0.02,
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
        marginTop: wHeight * 0.06,
        paddingBottom: wHeight * 0.05
    },
    txtSign: {
        fontStyle: 'italic',
    },
});

export default SignupScreen;

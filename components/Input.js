import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';

import IconE from 'react-native-vector-icons/Entypo';
import IconEV from 'react-native-vector-icons/EvilIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const Input = (props) => {
    let Icon;

    if(props.iconCom === 'SimpleLineIcons')
        Icon = IconS;
    else if(props.iconCom === 'EvilIcons')
        Icon = IconEV;
    else if(props.iconCom === 'Entypo')
        Icon = IconE;
    
    return (
        <View>
            <View style={styles.inputView}>
                <Icon
                    name={props.iconName}
                    color={Colors.bodyColor}
                    size={props.size ? props.size : 20}
                    style={styles.icon}
                />
                <TextInput
                    placeholder={props.name}
                    placeholderTextColor={Colors.bodyColor}
                    style={styles.input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.pwd ? props.pwd : false}
                    autoCapitalize={props.emailCap && props.emailCap}
                />
                {props.children}
            </View>
            {
                !!props.msg &&
                    <Text style={styles.msgError}>{props.msg}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    inputView: {
        marginTop: wHeight * 0.03,
        marginHorizontal: wWidth * 0.05,
        paddingHorizontal: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: wHeight * 0.01,
        paddingBottom: wHeight * 0.01
    },
    icon: {
        textAlign: 'center',
    },
    input: {
        marginLeft: 15,
        fontFamily: Fonts.bodyFont,
        width: wWidth * 0.55
    },
    msgError: {
        marginHorizontal: wWidth * 0.08,
        marginTop: wHeight * 0.01,
        fontFamily: Fonts.bodyFont,
        color: Colors.errorColor,
    },
});

export default Input;
import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';

import { useTheme } from '@react-navigation/native';

import IconS from 'react-native-vector-icons/SimpleLineIcons';

import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const Input = (props) => {
    const Colors = useTheme().colors;

    return (
        <View>
            <View style={styles(Colors).inputView}>
                <IconS
                    name={props.iconName}
                    color={Colors.fontColor}
                    size={20}
                    style={styles(Colors).icon}
                />
                <TextInput
                    placeholder={props.name}
                    placeholderTextColor={Colors.fontColor}
                    style={styles(Colors).input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.pwd ? props.pwd : false}
                    autoCapitalize={props.emailCap && props.emailCap}
                />
                {props.children}
            </View>
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    inputView: {
        marginTop: wHeight * 0.01,
        paddingHorizontal: wWidth * 0.03,
        borderColor: Colors.borderColor,
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: wHeight * 0.01,
        paddingBottom: wHeight * 0.005
    },
    icon: {
        textAlign: 'center',
    },
    input: {
        marginLeft: wWidth * 0.05,
        marginRight: wWidth * 0.03,
        fontFamily: Fonts.bodyFont,
        color: Colors.fontColor,
        width: wWidth * 0.55,
        paddingVertical: wHeight * 0.015
    },
});

export default Input;
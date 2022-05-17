import React from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';

import { useTheme } from '@react-navigation/native';

import IconM from 'react-native-vector-icons/MaterialIcons';

import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditInput = (props) => {
    const Colors = useTheme().colors;

    return (
        <View style={styles(Colors).dispView}>
            <Text style={styles(Colors).userTxt}>{props.txt}</Text>
            <View style={styles(Colors).btnView}>
            {
                props.edit ?
                    <Text style={styles(Colors).userInputTxt}>{props.value}</Text>
                :
                    <TextInput 
                        value={props.value}
                        style={styles(Colors).userInput}
                        {...props}
                        onChangeText={props.onChangeText}
                    />
            }
            {
                props.edit ?
                    <IconM 
                        name='edit'
                        size={27}
                        color={Colors.fontColor}
                        style={styles(Colors).btnEdit}
                        onPress={props.onEdit}
                    />
                :
                    <IconM 
                        name='check'
                        size={27}
                        color={Colors.fontColor}
                        style={styles(Colors).btnEdit}
                        onPress={props.onSave}
                    />
            }
            </View>
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    dispView: {
        paddingVertical: wHeight * 0.03,
    },
    userTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.030,
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: wWidth * 0.011,
    },
    userInputTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        paddingTop: wHeight * 0.015,
        width: wWidth * 0.76,
    },
    userInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.76,
    },
    btnEdit: {
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.03,
        paddingTop: wHeight * 0.01
    },
});

export default EditInput;
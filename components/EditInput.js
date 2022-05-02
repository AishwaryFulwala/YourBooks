import React from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';

import IconM from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditInput = (props) => {
    return (
        <View style={styles.dispView}>
            <Text style={styles.userTxt}>{props.txt}</Text>
            <View style={styles.btnView}>
            {
                props.edit ?
                    <Text style={styles.userInputTxt}>{props.value}</Text>
                :
                    <TextInput 
                        value={props.value}
                        style={styles.userInput}
                        {...props}
                        onChangeText={props.onChangeText}
                    />
            }
            {
                props.edit ?
                    <IconM 
                        name='edit'
                        size={27}
                        color='white'
                        style={styles.btnEdit}
                        onPress={props.onEdit}
                    />
                :
                    <IconM 
                        name='check'
                        size={27}
                        color='white'
                        style={styles.btnEdit}
                        onPress={props.onSave}
                    />
            }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
    userInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.55,
    },
    btnEdit: {
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.03,
        paddingTop: wHeight * 0.01
    },
});

export default EditInput;
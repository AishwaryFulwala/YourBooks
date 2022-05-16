import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import Toast from 'react-native-toast-message';

import Colors from '../constnats/DarkColors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const toastConfig= {
    errorToast: ({ text1 }) => (
        <View style={styles.errView}>
            <Text style={styles.errTxt}>{text1}</Text>
        </View>
    )
};

const CustomErrorToast = () => {
    return <Toast config={toastConfig} />
};

const styles = StyleSheet.create({
    errView: {
        width: wWidth * 0.9,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.drakGray,
        borderLeftColor: Colors.errorColor,
        borderLeftWidth: 5,
        paddingVertical: wHeight * 0.01,
    },
    errTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        paddingVertical: wHeight * 0.01,
        marginHorizontal: wWidth * 0.03
    },
});

export default CustomErrorToast;
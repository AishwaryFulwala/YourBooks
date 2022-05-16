import React from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from '@react-navigation/native';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SliderModal = (props) => {
    const Colors = useTheme().colors;
   
    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            transparent={true}
        >
            <TouchableWithoutFeedback 
                onPress={props.onClick}
            >
                <View style={styles(Colors).mainView}>
                    <View style={styles(Colors).modalView}>
                        <TouchableOpacity
                            style={styles(Colors).btn}
                            onPress={props.op1Press}
                        >
                            <IconM 
                                size={25}
                                color={Colors.fontColor}
                                name={props.op1Icon}
                            />
                            <Text style={styles(Colors).btnTxt}>{props.op1Txt}</Text>
                        </TouchableOpacity>
                        <View style={styles(Colors).horizontalView}></View>
                        <TouchableOpacity
                            style={styles(Colors).btn}
                            onPress={props.op2Press}
                        >
                            <IconM 
                                size={25}
                                color={Colors.fontColor}
                                name={props.op2Icon}
                            />
                            <Text style={styles(Colors).btnTxt}>{props.op2Txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal> 
    );
};

const styles = (Colors) => StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalView: {
        height: wHeight * 0.2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.btnGray,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: wHeight * 0.01,
    },
    btn: {
        width: wWidth * 0.9,
        height: wHeight * 0.09,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wWidth * 0.03,
    },
    btnTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        marginHorizontal: wWidth * 0.03
    },
    horizontalView: {
        borderColor: Colors.fontColor,
        borderWidth: 0.5,
        width: wWidth * 0.9,
        alignSelf: 'center',
        backgroundColor: Colors.fontColor,
    },
});

export default SliderModal;
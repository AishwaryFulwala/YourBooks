import React from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from '@react-navigation/native';

import IconF from 'react-native-vector-icons/Feather';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const PicModal = (props) => {
    const Colors = useTheme().colors;

    return (
        <Modal 
            visible={props.visible}
            transparent={true}
        >
            <TouchableWithoutFeedback 
                onPress={props.onClose}
            >
                <View style={styles(Colors).modalView}>
                    <View style={styles(Colors).borderView}>
                        <View style={styles(Colors).modal}>
                            <View style={styles(Colors).rotateTxt}>
                                <View style={styles(Colors).iconCrossModal}>
                                    <IconF
                                        name='x'
                                        size={20}
                                        color={Colors.fontColor}
                                        onPress={props.onClose}
                                    />
                                </View> 
                                {props.children}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = (Colors) => StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderView: {
        width: wWidth * 0.9,
        backgroundColor: Colors.bodyColor,
        borderColor: Colors.fontColor,
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: Colors.fontColor,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    modal: {
        width: wWidth * 0.9,
        backgroundColor: Colors.btnGray,
        borderColor: Colors.bodyColor,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
            { rotateX: "-3deg" },
            { rotateZ: "-4deg" }
        ],
    },
    rotateTxt: {
        width: wWidth * 0.9,
        transform: [
            { rotateX: "3deg" },
            { rotateZ: "4deg" }
        ],
    },
    iconCrossModal: {
        alignItems: 'flex-end',
        paddingHorizontal: wWidth * 0.1,
        paddingTop: wHeight * 0.01
    },
});

export default PicModal;
import React from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

import IconF from 'react-native-vector-icons/Feather';

import Colors from '../constnats/Colors';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const PicModal = (props) => {
    return (
        <Modal 
            visible={props.visible}
            transparent={true}
        >
            <TouchableWithoutFeedback 
                onPress={props.onClose}
            >
                <View style={styles.modalView}>
                    <View style={styles.borderView}>
                        <View style={styles.modal}>
                            <View style={styles.rotateTxt}>
                                <View style={styles.iconCrossModal}>
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

const styles = StyleSheet.create({
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
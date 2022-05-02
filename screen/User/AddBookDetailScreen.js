import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput } from 'react-native';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const AddBookDetailScreen = (props) => {
    const [ bookPic, setBookPic ] = useState('');

    return(        
        <View style={styles.body}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior='position'
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -100}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.body}>
                        <View>
                            <TouchableOpacity
                                style={styles.btnImg}
                                onPress={() => {}}
                            >
                                {
                                    !bookPic ?
                                        <View style={styles.imgView}>
                                            <IconM 
                                                name='image-edit-outline'
                                                size={30}
                                                color={Colors.fontColor}
                                            />
                                            <Text style={styles.txtImg}>Tab to add Media</Text>
                                        </View>
                                    :
                                        <Image
                                            source={require('../../assets/image/HomeCover.webp')}
                                            style={styles.img}
                                        />
                                }
                            </TouchableOpacity>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.titleInput}
                                    placeholder='Title your Story Part'
                                    placeholderTextColor={Colors.fontColor}
                                    // value={isTitle}
                                    // onChangeText={(txt) => setIsTitle(txt)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.descInput}
                                    placeholder='Tap here to start writing'
                                    placeholderTextColor={Colors.fontColor}
                                    multiline
                                    // value={isDesc}
                                    // onChangeText={(txt) => setIsDesc(txt)}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    btnImg: {
        backgroundColor: Colors.drakGray,
        marginVertical: wHeight * 0.02,
    },
    imgView: {
        borderColor: Colors.fontColor,
        borderStyle: 'dashed',
        borderWidth: 1,
        height: wHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtImg: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginTop: wHeight * 0.01,     
    },
    img: {
        height: wHeight * 0.2,
        width: wWidth,
    },
    inputView: {
        marginVertical: wHeight * 0.01,
        paddingLeft: wWidth * 0.05,
        paddingVertical: wWidth * 0.03,
    },
    titleInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.9,
        paddingVertical: wHeight * 0.01,
        textAlign: 'center'
    },
    descInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        width: wWidth * 0.9,
        paddingVertical: wHeight * 0.01,  
    },
});

export default AddBookDetailScreen;
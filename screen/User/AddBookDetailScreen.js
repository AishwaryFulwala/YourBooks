import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';

import { PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const AddBookDetailScreen = (props) => {
    const [ bookPic, setBookPic ] = useState('');
    const [ isTitle, setIsTitle ] = useState('');
    const [ isDesc, setIsDesc ] = useState('');
    const [ isPic, setIsPic ] = useState('');

    const [ isKey, setIsKey ] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide',() => {setIsKey(false)})
        Keyboard.addListener('keyboardDidShow',() => {setIsKey(true)})
    }, [ isTitle ]);

    const RichText = useRef();

    const verifyPermission = async () => {
        const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permission', [{text: 'okay'}])
            return false;
        }
        return true;
    };

    const storeImage = (val) => {
        const path = `/Images/Book/${Date.now() + val.fileName}`;
        const imgRef = firebase.app().storage('gs://yourbooks-f1f3d.appspot.com').ref(path);

        imgRef.putFile(val.uri)
            .then(async () => {
                try {
                    setIsPic(await imgRef.getDownloadURL());
                } catch (error) {
                    Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
                }
            })
            .catch(() => {
                Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            });
    };

    const launchImageLibraryHandler = async () => {
    //     RichText.current?.insertImage(
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    // );
        const hasPermission = verifyPermission()
        
        if(!hasPermission)
            return;

        let img;
        try {
            img = await launchImageLibrary()
        } catch (error) {
            Alert.alert('', 'Can\'t access Library', [{text: okay}])
            return;
        }

        if(img === undefined || img.assets === undefined){
            return;
        }
console.log(img.assets[0])
        RichText.current?.insertImage(img.assets[0].uri);
    };
    
    return(
        <View style={styles.body}>
            <KeyboardAwareScrollView extraScrollHeight={100}>
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
                            value={isTitle}
                            onChangeText={(txt) => setIsTitle(txt)}
                        />
                    </View>
                    <View style={styles.descInput}>
                        <RichEditor
                            editorStyle={styles.editInput}
                            ref={RichText}
                            placeholder='Tap here to start writing'
                            onChange={(txt) => console.log(txt)}
                        />
                    </View>
                    <View >
                        <RichToolbar
                            style={styles.richTool}
                            editor={RichText}
                            iconTint={Colors.btnGray}
                            selectedIconTint={Colors.fontColor}
                            iconSize={20}
                            actions={[
                                actions.undo,
                                actions.setBold,
                                actions.setItalic,
                                actions.setUnderline,
                                actions.insertImage,
                                actions.redo,
                            ]}
                            onPressAddImage={launchImageLibraryHandler}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        height: wHeight * 0.8,
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
        paddingVertical: wWidth * 0.03,
    },
    titleInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        paddingVertical: wHeight * 0.01,
        textAlign: 'center'
    },
    descInput: {
        marginVertical: wHeight * 0.01,
        height: wHeight * 0.34,
        borderColor: Colors.fontColor,
        borderWidth: 1,
    },
    editInput:{
        backgroundColor: Colors.bodyColor,
        color: Colors.fontColor,
        maxHeight: wHeight * 0.34,
    },
    richTool: {
        backgroundColor: "#c6c3b3",
        borderRadius: 10,
        width: wWidth,       
    },
});

export default AddBookDetailScreen;
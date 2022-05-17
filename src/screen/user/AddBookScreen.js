import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';

import { useIsFocused, useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { firebase } from '@react-native-firebase/storage';
import { PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Fonts from '../../constnats/Fonts';

import { addBook } from '../../redux/actions/Books.action';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const AddBookScreen = (props) => {
    const Colors = useTheme().colors;

    const [ bookPic, setBookPic ] = useState('');
    const [ isTitle, setIsTitle ] = useState('');
    const [ isDesc, setIsDesc ] = useState('');
    const [ isPic, setIsPic ] = useState('');
    const isCate = props?.route?.params || '';

    const isFocused = useIsFocused();

    const [ isKey, setIsKey ] = useState(false);

    const dispatch = useDispatch();

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
                    const url = await imgRef.getDownloadURL();
                    setIsPic(url);
                } catch (error) {
                    Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
                }
            })
            .catch(() => {
                Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            });
    };

    const launchImageLibraryHandler = async () => {
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

        setBookPic(img.assets[0]);
        storeImage(img.assets[0]);
    };

    const saveHandler = async () => {
        if(!isTitle) {
            Toast.show({
                type: 'errorToast',
                text1: 'Please enter Title.',
                position: 'bottom'
            });
            return;
        }

        if(!isCate) {
            Toast.show({
                type: 'errorToast',
                text1: 'Please enter Category.',
                position: 'bottom'
            });
            return;
        }
              
        try {
            const res = await dispatch(addBook(isPic, isTitle, isDesc, isCate.cateID));
            props.navigation.navigate('AddBookDetailN',{
                bookID: res._id,
                add: 'add',
            });
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(()=>{
        const onDidShow = () => {
          setIsKey(true);
        }

        const onDidHide = () => {
          setIsKey(false);
        }

        let subsribe1;
        let subscibe2;

        if(isFocused){
            subsribe1 = Keyboard.addListener('keyboardDidHide',onDidHide);
            subscibe2 = Keyboard.addListener('keyboardDidShow',onDidShow);
        }
       
        return () => {
            subsribe1?.remove();
            subscibe2?.remove();
        }
    }, [ isFocused ]);

    return (
        <View style={styles(Colors).body}>
            <KeyboardAwareScrollView  extraScrollHeight={100}>
                <View>
                    <Text style={styles(Colors).txtTitle}>Book</Text>
                    <TouchableOpacity
                        style={styles(Colors).btnImg}
                        onPress={launchImageLibraryHandler}
                    >
                        {
                            !bookPic ?
                                <View style={styles(Colors).btnView}>
                                    <View style={styles(Colors).imgView}>
                                        <IconA
                                            name='plus'
                                            color={Colors.fontColor}
                                            size={50}
                                        />
                                    </View>
                                    <Text style={styles(Colors).txtImg}>Add Book Cover</Text>
                                </View>
                            :
                                <View style={styles(Colors).btnView}>
                                    <View style={styles(Colors).imgView}>
                                        <Image
                                            source={{uri: bookPic?.uri}}
                                            style={styles(Colors).img}
                                        />
                                    </View>
                                    <Text style={styles(Colors).txtImg}>Edit Book Cover</Text>
                                </View>
                        }
                    </TouchableOpacity>
                    <View style={styles(Colors).inputView}>
                        <Text style={styles(Colors).titleTxt}>Book title</Text>
                        <TextInput 
                            style={styles(Colors).titleInput}
                            value={isTitle}
                            onChangeText={(txt) => setIsTitle(txt)}
                        />
                    </View>
                    <View style={styles(Colors).inputView}>
                        <Text style={styles(Colors).titleTxt}>Book Decription</Text>
                        <TextInput 
                            style={styles(Colors).titleInput}
                            multiline
                            value={isDesc}
                            onChangeText={(txt) => setIsDesc(txt)}
                        />
                    </View>
                    <View style={styles(Colors).inputView}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('AddCategoryN') }
                            style={styles(Colors).btnCate}
                        >
                            <Text style={styles(Colors).titleTxt}>Category</Text>
                            <Text style={styles(Colors).categoryTxt}>{isCate.cateName || ''}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {
                !isKey &&
                <View style={styles(Colors).saveView}>
                    <TouchableOpacity
                        onPress={saveHandler}
                        style={styles(Colors).saveBtn}
                    >
                        <IconM
                            name='content-save-check'
                            color={Colors.fontColor}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            }
         </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    txtTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        alignSelf: 'center',
        marginVertical: wHeight * 0.01,
    },
    btnImg: {
        backgroundColor: Colors.drakGray,
        height: wHeight * 0.2,
        justifyContent: 'center',
        marginVertical: wHeight * 0.02,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgView: {
        marginHorizontal: wWidth * 0.03,
        borderColor: Colors.fontColor,
        borderStyle: 'dashed',
        borderWidth: 1,
        height: wHeight * 0.15,
        width: wWidth * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: wHeight * 0.15,
        width: wWidth * 0.2,
    },
    txtImg: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginHorizontal: wWidth * 0.03,
    },
    inputView: {
        backgroundColor: Colors.drakGray,
        marginVertical: wHeight * 0.01,
        paddingLeft: wWidth * 0.05,
        paddingVertical: wWidth * 0.03,
    },
    titleTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
    },
    titleInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.9,
        paddingVertical: wHeight * 0.01,
    },
    btnCate: {
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.9,
    },
    categoryTxt: {
        paddingVertical: wHeight * 0.01,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    saveView: {
        position: 'absolute',
        right: wWidth * 0.03,
        bottom: wHeight * 0.015,
    },
    saveBtn: {
        height: wHeight * 0.057,
        width: wHeight * 0.057,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: Colors.bookColor,
    },
});

export default AddBookScreen;
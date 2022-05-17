import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator, Platform } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { StackActions, useTheme } from "@react-navigation/native";

import { firebase } from '@react-native-firebase/storage';
import { PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import { addBookDetail, getPartsByID, updateBookDetail } from '../../redux/actions/BooksDetail.action';
import { getReadingListByBookID } from '../../redux/actions/ReadingList.action';
import { addFirebaseNotification, addNotification } from '../../redux/actions/Notification.action';
import { getBooksByID } from '../../redux/actions/Books.action';

import CustomHeaderButton from '../../components/CustomHeaderButton';
import { useKeyboard } from '../../hooks/keyboardHook';

import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const AddBookDetailScreen = (props) => {
    const Colors = useTheme().colors;

    const bookID = props.route.params.bookID;
    const partID = props.route.params?.partID;
    const add = props.route.params?.add;
    const part = useSelector((state) => state?.booksDetail?.getBooksDetailData);
    const book = useSelector((state) => state?.books?.getBookData?.getBooksByID);
    const readingList = useSelector((state) => state?.readingList?.getReadingListData);

    const [ isPart , setIsPart ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const keyboardHeight = useKeyboard();
    
    const RichText = useRef();

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getPartsByID(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getReadingListByBookID(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);

        if(part?.length)
            part?.map((val) => {
                if(val._id===partID)
                    setIsPart(val);
            });
    }, []);

    useEffect(() => {
        setTitle(isPart?.PartName);
        setDesc(isPart?.PartContain);
    }, [ isPart ]);

    const verifyPermission = async () => {
        const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permission', [{text: 'okay'}])
            return false;
        }
        return true;
    };

    const storeImage = (val) => {
        const path = `/Images/BookDetail/${Date.now() + val.fileName}`;
        const imgRef = firebase.app().storage('gs://yourbooks-f1f3d.appspot.com').ref(path);
        
        setIsLoading(true);

        imgRef.putFile(val.uri)
            .then(async () => {
                try {
                    const res = await imgRef.getDownloadURL();

                    setIsLoading(false);
                    RichText.current?.insertImage(res);
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

        await storeImage(img.assets[0])
    };

    const saveHandler = async () => {
        if(isPart) {
            try {
                await dispatch(updateBookDetail(isPart?._id, { PartName: title, PartContain: desc }));
                props.navigation.navigate('EditBookN', {
                    bookID: bookID
                });
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }
        else {
            try {
                await dispatch(addBookDetail(part?.length + 1, title, desc, bookID));

                if(readingList?.length) {
                    const msg = `${book[0]?._id?.UserName} updated new part of ${book[0]?._id?.BookName}`;

                    await dispatch(addFirebaseNotification('Update', msg, bookID));

                    const res = readingList?.map((val) => {
                        return new Promise((resolve, reject) => {
                            dispatch(addNotification('Update', msg, bookID, val.UserID))
                            .then(resolve, reject);
                        })
                    })

                    await Promise.all(res).then(() => {}).catch((error) => {
                        Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
                    });
                }

                if(add) {
                    props.navigation.dispatch(
                        StackActions.pop(2)
                    );
                }

                props.navigation.navigate('EditBookN', {
                    bookID: bookID
                });
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                if(title &&  desc)
                    return (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item
                                title='Save'
                                iconName='book-arrow-up-outline'
                                IconComponent={IconMC}
                                onPress={saveHandler}
                                disabled={isLoading ? true : false}
                            />
                        </HeaderButtons>
                    );  
                else
                    return <View/>;
            },
        });
    }, [ title, desc, isLoading ]);

    return(
        <View style={styles(Colors).body}>
            {
                isLoading &&
                <ActivityIndicator color={Colors.fontColor} />
            }
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={isLoading ? true : false}>
                <View style={styles(Colors).body}>
                    <Text style={styles(Colors).txtTitle}>Book Detail</Text>
                    <View style={styles(Colors).inputView}>
                        <Text style={styles(Colors).titleTxt}>Book title</Text>
                        <TextInput 
                            style={styles(Colors).titleInput}
                            value={title}
                            onChangeText={(txt) => setTitle(txt)}
                            editable={isLoading ? false : true}
                        />
                    </View>
                    <RichEditor
                        containerStyle={{ paddingBottom: Platform.OS === 'ios' ? keyboardHeight - 100 : 0}}
                        style={styles(Colors).descInput}
                        editorStyle={styles(Colors).editInput}
                        ref={RichText}
                        placeholder='Tap here to start writing'
                        useContainer
                        onChange={(txt) => setDesc(txt)}
                        disabled={isLoading ? true : false}
                        initialContentHTML={desc}
                    />
                    <RichToolbar
                        style={styles(Colors).richTool}
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
                        disabled={isLoading ? true : false}
                    />
                </View>
            </TouchableWithoutFeedback>
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
    descInput: {
        flex: 1,
        maxHeight: 500,
    },
    editInput:{
        backgroundColor: Colors.drakGray,
        color: Colors.fontColor,
        placeholderColor: Colors.fontColor,
        contentCSSText: `
            font-size: ${wWidth * 0.04}px;
            display: flex; 
            flex-direction: column; 
            min-height: 100px;
            position: absolute; 
            top: 0; right: 0; bottom: 0; left: 0;`,
    },
    richTool: {
        backgroundColor: Colors.richColor,
        borderRadius: 10,
        width: wWidth,       
    },
});

export default AddBookDetailScreen;
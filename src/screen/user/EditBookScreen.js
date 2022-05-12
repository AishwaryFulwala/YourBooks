import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { firebase } from '@react-native-firebase/storage';
import { PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import IconA from 'react-native-vector-icons/AntDesign';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import { deleteAllBookDetail, getPartsByID } from '../../redux/actions/BooksDetail.action';
import { deleteBook, getBooksByID, updateBook } from '../../redux/actions/Books.action';
import { deleteNotificationByID } from '../../redux/actions/Notification.action';
import { deleteReadingListByID } from '../../redux/actions/ReadingList.action';
import { deleteRatingByID } from '../../redux/actions/Rating.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import CustomHeaderButton from '../../components/CustomHeaderButton';
import EditInput from '../../components/EditInput';
import PicModal from '../../components/PicModal';
import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditBookScreen = (props) => {
    const bookID = props.route.params.bookID;
    const book = useSelector((state) => state?.books?.getBookData?.getBooksByID);
    const bookDetail = useSelector((state) => state?.booksDetail?.getBooksDetailData);

    const [ isTitle, setIsTitle ] = useState('');
    const [ isDesc, setIsDesc ] = useState('');
    const [ isPic, setIsPic ] = useState('');

    const [ isTitleEdit, setIsTitleEdit ] = useState(true);
    const [ isDescEdit, setIsDescEdit ] = useState(true);

    const [ msg, setMsg ] = useState({});

    const [ isLoad, setIsLoad ] = useState(false);
    const [ open, setOpen ] = useState(false);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getPartsByID(bookID));
        } catch (error) {
            if(error?.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        if(book) {
            setIsTitle(book[0]?._id?.BookName);
            setIsDesc(book[0]?._id?.Description);
            setIsPic(book[0]?._id?.BookPic);
        }
    }, [ book ]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Save'
                            iconName='delete-outline'
                            IconComponent={IconMC}
                            onPress={() => setOpen(!open)}
                        />
                    </HeaderButtons>
                );                
            },
        });
    }, [ isTitle, isDesc, isPic ]);

    const verifyPermission = async () => {
        const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permission', [{text: 'okay'}]);
            return false;
        }
        return true;
    };

    const storeImage = (val) => {
        const path = `/Images/Book/${Date.now() + val.fileName}`;
        const imgRef = firebase.app().storage('gs://yourbooks-f1f3d.appspot.com').ref(path);

        setIsLoad(true);

        imgRef.putFile(val.uri)
            .then(async () => {
                try {
                   const url = await imgRef.getDownloadURL();

                   setIsPic(url);
                   setIsLoad(false);
                   updateBookHandler({BookPic: url});
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

        storeImage(img.assets[0]);
    };

    const updateBookHandler = async (val) => {
        if(isTitle === ''){
            setMsg({
                id: 'title',
                error: 'Title can\'t be empty.'
            });
            return
        }
        else 
            setMsg({
                id: 'opassword',
                error: ''
            });

        try {
            await dispatch(updateBook(bookID, val));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        load();
    };

    const deleteBookDetail = async () => {
        setOpen(!open);

        try {
            await dispatch(deleteBook(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(deleteAllBookDetail(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(deleteReadingListByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(deleteRatingByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(deleteNotificationByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        props.navigation.navigate('Write');
    };

    if(!book || !bookDetail || isLoad) {
        return (
            <View style={styles.activity}>
                <PageLoader />
            </View>
        );
    }

    return(        
        <View style={styles.body}>
            <KeyboardAwareScrollView  extraScrollHeight={100}>
                <View>
                    <TouchableOpacity
                        style={styles.btnImg}
                        onPress={launchImageLibraryHandler}
                    >
                        <View style={styles.btnView}>
                            <View style={styles.imgView}>
                                {   
                                    !!isPic &&
                                    <Image
                                        source={{uri: isPic}}
                                        style={styles.img}
                                    />
                                }
                            </View>
                            <Text style={styles.txtImg}>Edit Book Cover</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containView}>
                        <EditInput
                            txt='Book Title'
                            value={isTitle}
                            onChangeText={(txt) => setIsTitle(txt)}
                            edit={isTitleEdit}
                            onEdit={() =>  setIsTitleEdit(!isTitleEdit)}
                            onSave={() => {
                                updateBookHandler({BookName: isTitle});
                                setIsTitleEdit(!isTitleEdit);
                            }}
                        />
                        {
                            msg.id === 'title' && msg.error !== '' && 
                            <Text style={styles.msgError}>{msg.error}</Text>
                        }
                        <View style={styles.horizontalView}></View>
                        <EditInput
                            txt='Book Description'
                            value={isDesc}
                            onChangeText={(txt) => setIsDesc(txt)}
                            multiline
                            edit={isDescEdit}
                            onEdit={() => setIsDescEdit(!isDescEdit)}
                            onSave={() => {
                                updateBookHandler({Description: isDesc});
                                setIsDescEdit(!isDescEdit);
                            }}
                        />
                    </View>
                    <View style={styles.cateView}>
                        <Text style={styles.cateTxt}>Category</Text>
                        <Text style={styles.cateInputTxt}>{book[0]?._id?.CategoryName}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.tableView}>
                        <Text style={styles.tableTxt}>TABLE OF CONTENT</Text>
                        <IconMC
                            name='dots-vertical'
                            size={25}
                            color={Colors.fontColor}
                            onPress={() => {
                                props.navigation.navigate('EditBookDetailN',{
                                    bookID: bookID,
                                });
                            }}
                        />
                    </View>
                        {
                            !!bookDetail?.length &&
                            <View style={styles.detailView}>
                                {
                                    bookDetail?.map((val, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={styles.detailBlock}
                                                key={index}
                                                onPress={() => {
                                                    props.navigation.navigate('AddBookDetailN',{
                                                        bookID: bookID,
                                                        partID: val._id,
                                                    });
                                                }}
                                            >
                                                <Text style={styles.detailTxt}>{val.PartNo}. {val.PartName}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        }
                        <TouchableOpacity
                            style={styles.addView}
                            onPress={() => {
                                props.navigation.navigate('AddBookDetailN',{
                                    bookID: bookID
                                });
                            }}
                        >
                            <IconA
                                name='plus'
                                color={Colors.lightGray}
                                size={30}
                            />
                            <Text style={styles.addTxt}>Add New Part</Text>
                        </TouchableOpacity>
                 </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
                style={styles.triangleCorner}
                onPress={() => updateBookHandler({Status: !book[0]?._id?.Status})}
            >
                <Text style={styles.statusTxt}>{book[0]?._id?.Status ? 'Ongoing' : 'Complete'}</Text>
            </TouchableOpacity>
            <PicModal
                onClose={() => setOpen(!open)}
                visible={open}
            >
                <View style={styles.mainModalView}>
                    <Text style={styles.deleteTitle}>Delete Book</Text>
                    <Text style={styles.deleteTxt}>Note: If you delete book will also delete the story.{'\n'}All reads, review and rating for this book will be deleted.</Text>
                    <Text style={styles.deleteTxt}>Are you sure you want to delete this book?</Text>
                    <View style={styles.btnModalView}>
                        <Text
                            style={styles.modalBtnTxt}
                            onPress={deleteBookDetail}
                        >Yes</Text>
                        <Text
                            style={styles.modalBtnTxt}
                            onPress={() => setOpen(!open)}
                        >No</Text>
                    </View>
                </View>
            </PicModal>
        </View>
    );
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    btnImg: {
        backgroundColor: Colors.drakGray,
        height: wHeight * 0.2,
        justifyContent: 'center',
        marginTop: wHeight * 0.01,
        marginBottom: wHeight * 0.03,
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
    containView: {
        backgroundColor: Colors.drakGray,
        paddingHorizontal: wWidth * 0.05,
    },
    msgError: {
        width: wWidth * 0.7,
        marginTop: -(wHeight * 0.01),
        marginBottom: wHeight * 0.02,
        paddingHorizontal: wWidth * 0.03,
        fontFamily: Fonts.bodyFont,
        color: Colors.errorColor,
    },
    horizontalView: {
        borderColor: Colors.btnGray,
        borderWidth: 1
    },
    cateView: {
        marginTop: wHeight * 0.03,
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.05,
        paddingVertical: wHeight * 0.02,
        backgroundColor: Colors.drakGray,
    },
    cateTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.030,
    },
    cateInputTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        paddingTop: wHeight * 0.01,
        paddingLeft: wWidth * 0.011,
    },
    tableView: {
        flexDirection: 'row',
        marginTop: wHeight * 0.02,
        paddingTop: wHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wWidth * 0.06,
    },
    tableTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
    },
    detailView: {
        backgroundColor: Colors.drakGray,
        marginTop: wHeight * 0.03,
    },
    detailBlock: {
        height: wHeight * 0.09,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
    },
    detailTxt: {
        marginVertical: wHeight * 0.03,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        paddingHorizontal: wWidth * 0.05,
    },
    addView: {
        marginVertical: wHeight * 0.03,
        backgroundColor: Colors.drakGray,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderStyle: 'dashed',
        height: wHeight * 0.13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    triangleCorner: {
        width: wWidth * 0.45,
        height: wHeight * 0.05,
        backgroundColor: Colors.bookColor,
        borderStyle: "solid",
        transform: [{ rotate: "-45deg" }],
        position: 'absolute',
        bottom: wWidth * 0.05,
        right: -(wWidth * 0.125),
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
    },
    mainModalView: {
        paddingVertical: wHeight * 0.03,
        paddingHorizontal: wHeight * 0.03,
    },
    deleteTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    deleteTxt: {
        marginTop: wHeight * 0.025,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        lineHeight: wHeight * 0.03
    },
    btnModalView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: wHeight * 0.01,
        paddingTop: wHeight * 0.05,
    },
    modalBtnTxt: {
        marginHorizontal: wWidth * 0.05,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
});

export default EditBookScreen;
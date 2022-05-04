import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { getBooksByID } from '../../redux/actions/Books.action';
import { getBooksDetailByID } from '../../redux/actions/BooksDetail.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import EditInput from '../../components/EditInput';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditBookScreen = (props) => {
    const bookID = props.route.params.bookID;
    const book = useSelector((state) => state.books.getBookData.getBooksByID);
    const bookDetail = useSelector((state) => state.booksDetail.getBooksDetailData);

    const [ isTitleEdit, setIsTitleEdit ] = useState(true);
    const [ isDescEdit, setIsDescEdit ] = useState(true);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getBooksDetailByID(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    if(!book || !bookDetail) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }

    return(        
        <View style={styles.body}>
            <KeyboardAwareScrollView  extraScrollHeight={100}>
                <View>
                    <TouchableOpacity
                        style={styles.btnImg}
                        onPress={() => {}}
                    >
                        <View style={styles.btnView}>
                            <View style={styles.imgView}>
                                <Image
                                    source={{uri: book[0]._id.BookPic}}
                                    style={styles.img}
                                />
                            </View>
                            <Text style={styles.txtImg}>Edit Book Cover</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containView}>
                        <EditInput
                            txt='Book Title'
                            value={book[0]._id.BookName}
                            onChangeText={(txt) => {}}
                            edit={isTitleEdit}
                            onEdit={() =>  setIsTitleEdit(!isTitleEdit)}
                            onSave={() => {                                            
                                        
                            }}
                        />
                        {/* {
                            msg.id === 'contactNo' && msg.error !== '' && 
                            <Text style={styles.msgError}>{msg.error}</Text>
                        } */}
                        <View style={styles.horizontalView}></View>
                        <EditInput
                            txt='Book Description'
                            value={book[0]._id.Description}
                            onChangeText={(txt) => {}}
                            multiline
                            edit={isDescEdit}
                            onEdit={() => {}}
                            onSave={() => {}}
                        />
                    </View>
                    <View style={styles.cateView}>
                        <Text style={styles.cateTxt}>Category</Text>
                        <Text style={styles.cateInputTxt}>{book[0]._id.CategoryName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.tableTxt}>TABLE OF CONTENT</Text>
                    <View style={styles.ratingDispView}>
                            {/* {
                                bookDetail.map((val, index) => {
                                    return ( */}
                                        <View style={styles.ratingUser}>
                                            <View style={styles.ratingUserDate}>
                                                <Text style={styles.txtRatingUser}>val.UserName</Text>
                                                <Text style={styles.txtReview}>val.Review</Text>
                                            </View>
                                        </View>
                                    {/* )
                                }) 
                            } */}
                        </View>
                 </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
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
        borderRadius: 15,
        paddingHorizontal: wWidth * 0.05,
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
        borderRadius: 10,
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
    tableTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
        marginHorizontal: wWidth * 0.05,
        marginVertical: wHeight * 0.03,
    },
    ratingDispView:{
        backgroundColor: Colors.drakGray,
        borderRadius: 10,
        marginHorizontal: wWidth * 0.05,
        marginTop: wHeight * 0.02,
        alignItems: 'center',
    },
    ratingDispBlock: {
        backgroundColor: Colors.btnGray,
        borderRadius: 7,
        marginVertical: wHeight * 0.02,
        paddingVertical: wHeight * 0.02,
        width: wWidth * 0.8,
        alignItems: 'center',
    },
    ratingUser: {
        flexDirection: 'row',
    },
    ratingUserImgView: {
        height: wHeight * 0.05,
        width: wHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    ratingUserImg: {
        height: wHeight * 0.05,
        width: wHeight * 0.05,
        borderRadius: 100,
    },
    ratingUserDate: {
        marginLeft: wWidth * 0.03,
        width: wWidth * 0.6,
    },
    txtRatingUser: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    txtRatingDate: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
    },
    ratingStar: {
        flexDirection: 'row',
        marginTop: wHeight * 0.005,
    },
    txtReview: {
        marginTop: wHeight * 0.005,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,
    },
    
});

export default EditBookScreen;
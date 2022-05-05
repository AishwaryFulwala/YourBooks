import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconO from 'react-native-vector-icons/Octicons';
import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { getBooksByID, updateBook } from '../../redux/actions/Books.action';
import { addRating, getAvgRating, getRatingByBook } from '../../redux/actions/Rating.action';
import { addReadingList, deleteReadingList, getReadingListByID } from '../../redux/actions/ReadingList.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import SliderModal from '../../components/SliderModal';
import PicModal from '../../components/PicModal';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const BookScreen = (props) => {
    const bookID = props.route.params.bookID;
    const book = useSelector((state) => state.books.getBookData.getBooksByID);
    const avgRating = useSelector((state) => state.ratings.getRatingData.getAvgRating);
    const rating = useSelector((state) => state.ratings.getRatingData.getRatingByBook);
    const readingList = useSelector((state) => state.readingList.getReadingListData);

    const [ open, setOpen ] = useState(false);
    const [ isLike, setIsLike ] = useState(false);

    const [ rate, setRate] = useState(5);
    const [ review, setReview ] = useState('');
    
    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getAvgRating(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getRatingByBook(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getReadingListByID(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const loadBook = async () => {
        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    const addToList = async (no) => {
        if(readingList._id) {
            try {
                await dispatch(deleteReadingList(readingList._id));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }

            try {
                await dispatch(updateBook(bookID, { NoOfReads: (no-1) }));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }
        else {
            try {
                await dispatch(addReadingList(bookID));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }

            try {
                await dispatch(updateBook(bookID, { NoOfReads: (no+1) }));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }
        loadBook();
    };

    const startReadingHandler = () => {
        setOpen(!open);
        props.navigation.navigate('BookReadingN', {
            bookID: bookID,
        });
    };

    const rateNowHandler = async () => {
        setIsLike(!isLike);
        setRate(5);
        setReview('');

        try {
            await dispatch(addRating(rate, review, bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getAvgRating(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getRatingByBook(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    const ratingIcon = (n) => <IconI name='star-sharp' color={Colors.fontColor} size={20} key={n}/>
    const starIcons = n => [...Array(n)].map((_, index) => ratingIcon(index));

    if(!book || !book.length || !avgRating || !rating || !readingList) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }   

    return book.map((val, index) => {
        const parts = val.count;
        val = val._id;

        return (
            <View style={styles.body} key={index}>
                <SliderModal 
                    visible={open}
                    onClick={() => setOpen(!open)}
                    op1Txt={!readingList.BookID ? 'Add to Reading List' : 'Remove From Reading List'}
                    op2Txt='Start Reading'
                    op1Icon='book-plus-multiple'
                    op2Icon='book-open-page-variant'
                    op1Press={() => addToList(val.NoOfReads)}
                    op2Press={startReadingHandler}
                />            
                <ImageBackground
                    style={styles.imgCover}
                    source={{uri: val.BookPic}}
                    blurRadius={50}
                >
                    <Image
                        style={styles.img}
                        source={{uri: val.BookPic}}
                    />
                    <Text style={styles.txtTitle}>{val.BookName}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('ViewProfileN', {
                                userID: val.UserID,
                            });
                        }}
                    >
                        <Text style={styles.txtAuthor}>{val.UserName}</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.containView}>
                        <TouchableOpacity
                            style={styles.btnRead}
                            onPress={() => {
                                setOpen(!open);
                            }}
                        >
                            <Text style={styles.btnReadTxt}>Read</Text>
                        </TouchableOpacity>
                        <View style={styles.statusView}>
                            <View style={styles.txtBgView}>
                                <Text style={styles.txtStatus}>{val.Status ? 'Ongoing' : 'Complete'}</Text>
                            </View>
                            <View style={styles.txtBgView}>
                                <Text style={styles.txtStatus}>{val.CategoryName}</Text>
                            </View>
                            
                        </View>
                        <View style={styles.txtIconView}>
                            <View style={styles.iconView}>
                                <IconFA
                                    name='eye'
                                    size={17} 
                                    color={Colors.fontColor}
                                    style={styles.icon}
                                />
                                <Text style={styles.txtIcon}>{val.NoOfReads}</Text>
                            </View>
                            <View style={styles.borderVertical}></View>
                            <View style={styles.iconView}>
                                <IconO
                                    name='list-unordered'
                                    size={17} 
                                    color={Colors.fontColor}
                                    style={styles.icon}
                                />
                                <Text style={styles.txtIcon}>{parts}</Text>
                            </View>
                            <View style={styles.borderVertical}></View>
                            <View style={styles.iconView}>
                                <IconI
                                    name='star-sharp'
                                    size={17} 
                                    color={Colors.fontColor}
                                    style={styles.icon}
                                />
                                <Text style={styles.txtIcon}>{avgRating.length ? avgRating[index].avg.toFixed(1) : 0}</Text>
                            </View>
                        </View>
                        <View style={styles.descView}>
                            <Text style={styles.txtDesc}>{val.Description}</Text>
                        </View>
                        <View style={styles.ratingDispView}>
                            {
                                rating.map((val, index) => {
                                    val = val._id;

                                    return (
                                        <View style={styles.ratingDispBlock} key={index}>
                                            <View style={styles.ratingUser}>
                                                <View style={styles.ratingUserImgView}>
                                                    <Image
                                                        source={{uri: val.ProfilePic}}
                                                        style={styles.ratingUserImg}
                                                    />
                                                </View>
                                                <View style={styles.ratingUserDate}>
                                                    <Text style={styles.txtRatingUser}>{val.UserName}</Text>
                                                    <Text style={styles.txtRatingDate}>{new Date(val.ReviewDate).toLocaleDateString()}</Text>
                                                    <View style={styles.ratingStar}>
                                                        {starIcons(val.Rating)}
                                                    </View>
                                                    <Text style={styles.txtReview}>{val.Review}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) 
                            }
                        </View>
                    </View>
                </ScrollView>   
                <View style={styles.starView}>
                    <TouchableOpacity
                        onPress={() => setIsLike(!isLike)}
                        style={styles.starBtn}
                    >
                        <IconO name='heart-fill' size={25} color={Colors.fontColor} />
                    </TouchableOpacity>
                    <PicModal
                        onClose={() => setIsLike(!isLike)}
                        visible={isLike}
                    >
                        <View style={styles.mainView}>
                            <Text style={styles.ratingTitle}>Your opinion matter to us</Text>
                            <View style={styles.horizontalView}></View>
                            <Text style={styles.ratingTxt}>Share your feedback.</Text>
                            <View style={styles.ratingIconView}>
                                <IconM
                                    name={rate === 1 ? 'emoticon-dead' : 'emoticon-dead-outline'}
                                    size={rate === 1 ? 40 : 35}
                                    color={Colors.fontColor}
                                    onPress={() => rate !== 1 ? setRate(1) : setRate(0)}
                                />
                                <IconM
                                    name={rate === 2 ? 'emoticon-sad' : 'emoticon-sad-outline'}
                                    size={rate === 2 ? 40 : 35}
                                    color={Colors.fontColor}
                                    onPress={() => rate !== 2 ? setRate(2) : setRate(0)}
                                />
                                <IconM
                                    name={rate === 3 ? 'emoticon-neutral' : 'emoticon-neutral-outline'}
                                    size={rate === 3 ? 40 : 35}
                                    color={Colors.fontColor}
                                    onPress={() => rate !== 3 ? setRate(3) : setRate(0)}
                                />
                                <IconM
                                    name={rate === 4 ? 'emoticon-happy' : 'emoticon-happy-outline'}
                                    size={rate === 4 ? 40 : 35}
                                    color={Colors.fontColor}
                                    onPress={() => rate !== 4 ? setRate(4) : setRate(0)}
                                />
                                <IconM
                                    name={rate === 5 ? 'emoticon-excited' : 'emoticon-excited-outline'}
                                    size={rate === 5 ? 40 : 35}
                                    color={Colors.fontColor}
                                    onPress={() => rate !== 5 ? setRate(5) : setRate(0)}
                                />
                            </View>
                            <TextInput 
                                style={styles.reviewInput}
                                multiline
                                placeholder="Leave a message, if you want"
                                placeholderTextColor={Colors.fontColor}
                                value={review}
                                onChangeText={(txt) => setReview(txt)}
                            />
                            <TouchableOpacity
                                style={styles.ratingBtn}
                                onPress={rateNowHandler}
                            >
                                <Text style={styles.ratingBtnTxt}>Rate Now</Text>
                            </TouchableOpacity>
                        </View>
                    </PicModal>
                </View>         
            </View>
        );
    });
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        justifyContent:'flex-end'
    },
    imgCover: {
        height: wHeight * 0.4,
        width: wWidth,
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        height: wHeight * 0.2,
        width: wWidth * 0.3,
        borderRadius: 7
    },
    txtTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        marginTop: wHeight * 0.03,
        textAlign: 'center',
    },
    txtAuthor: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginTop: wHeight * 0.01,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    scrollView: {
        backgroundColor: Colors.bodyColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -(wHeight * 0.05),
    },
    containView: {
        marginBottom: wHeight * 0.03,
    },
    btnRead: {
        marginTop: wHeight * 0.02,
        backgroundColor: Colors.fontColor,
        height: wHeight * 0.05,
        justifyContent: 'center',
        alignSelf: 'center',
        width: wWidth * 0.5,
        borderRadius: 20
    },
    btnReadTxt: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center'
    },
    statusView: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: wHeight * 0.02,
        marginHorizontal: wWidth * 0.05,
    },
    txtBgView: {
        backgroundColor: Colors.titleColor,
        borderRadius: 20,
    },
    txtStatus: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        padding: wWidth * 0.02,
    },
    txtIconView: {
        flexDirection: 'row',
        marginTop: wHeight * 0.02,
        marginHorizontal: wWidth * 0.05,
        height: wHeight * 0.07,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.drakGray,
        borderColor: Colors.drakGray,
        alignContent: 'center',
        justifyContent: 'space-evenly',        
    },
    iconView: {
        justifyContent: 'space-evenly'
    },
    icon: {
        alignSelf: 'center'
    },
    txtIcon: {
        marginHorizontal: wWidth * 0.02,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    borderVertical: {
        borderRightWidth: 1,
        borderRightColor: Colors.fontColor,
        marginVertical: wHeight * 0.01
    },
    descView:{
        backgroundColor: Colors.drakGray,
        borderRadius: 10,
        marginHorizontal: wWidth * 0.05,
        marginTop: wHeight * 0.02,
    },
    txtDesc: {
        marginVertical: wHeight * 0.02,
        marginHorizontal: wWidth * 0.05,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        lineHeight: wHeight * 0.025,
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
    starView: {
        position: 'absolute',
        right: wWidth * 0.03,
        bottom: wHeight * 0.015,
    },
    starBtn: {
        height: wHeight * 0.057,
        width: wHeight * 0.057,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: Colors.bookColor,
    },
    mainView: {
        paddingVertical: wHeight * 0.03,
        alignItems: 'center',
    },
    ratingTitle: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    horizontalView: {
        marginTop: wHeight * 0.025,
        borderColor: Colors.fontColor,
        borderWidth: 0.5,
        width: wWidth * 0.8,
        alignSelf: 'center',
        backgroundColor: Colors.fontColor,
    },
    ratingTxt: {
        marginTop: wHeight * 0.025,
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        width: wWidth * 0.8,
    },
    ratingIconView: {
        marginTop: wHeight * 0.025,
        width: wWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 15,
    },
    reviewInput: {
        marginTop: wHeight * 0.025,
        borderColor: Colors.fontColor,
        borderWidth: 1,
        height: wHeight * 0.1,
        width: wWidth * 0.8,
        borderRadius: 15,
        paddingHorizontal: wWidth * 0.03,
        paddingTop: wHeight * 0.01,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    ratingBtn: {
        marginTop: wHeight * 0.03,
        marginBottom: wHeight * 0.01,
        backgroundColor: Colors.fontColor,
        height: wHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: wWidth * 0.5,
        borderRadius: 30
    },
    ratingBtnTxt: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
});

export default BookScreen;
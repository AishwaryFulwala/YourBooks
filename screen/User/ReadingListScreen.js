import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity , Alert, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { deleteReadingList, getReadingListByUserID } from '../../redux/actions/ReadingList.action';
import { updateBook } from '../../redux/actions/Books.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import SliderModal from '../../components/SliderModal';
import BookFlatList from '../../components/BookFlatLIst';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const ReadingListScreen = (props) => {
    const readingList = useSelector((state) => state?.readingList?.getReadingListData);

    const [ open, setOpen ] = useState(false);
    const [ isID, setIsID ] = useState(null);
    const [ isBookID, setIsBookID ] = useState(null);
    const [ isReads, setIsReads ] = useState(null);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getReadingListByUserID());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const deleteToList = async (id, bid, no) => {
        try {
            await dispatch(deleteReadingList(id));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(updateBook(bid, { NoOfReads: (no-1) }));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        load();
        setOpen(!open);
    };

    const startReadingHandler = (id) => {
        setOpen(!open);
        props.navigation.navigate('BookReadingN', {
            bookID: id,
        });
    };

    if(!readingList) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }

    return(
        <View style={styles.body}>
            { 
                !readingList?.length ?
                    <View style={styles.activity}>
                        <Text style={styles.txtNoBook}>You don't have any book in </Text>
                        <Text style={styles.txtNoBook}> your reading list.</Text>
                        <TouchableOpacity
                            style={styles.btnAdd}
                            onPress={() => {
                                props.navigation.navigate('Home');
                            }}
                        >
                            <Text style={styles.btnAddTxt}>ADD BOOKS NOW</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={styles.dispView}>
                        <View style={styles.titleView}>
                            <Text style={styles.txtTitle}>Your List</Text>
                            <Text style={styles.txtStories}>{readingList?.length} Stories</Text>
                        </View>
                        <View style={styles.dispView}>
                            <SliderModal 
                                visible={open}
                                onClick={() => setOpen(!open)}
                                op1Txt='Start Reading'
                                op2Txt='Remove From Reading List'
                                op1Icon='book-plus-multiple'
                                op2Icon='book-open-page-variant'
                                op1Press={() => startReadingHandler(isBookID)}
                                op2Press={() => deleteToList(isID, isBookID, isReads)}
                            />
                            <BookFlatList
                                book={readingList}
                                onList={(id, bid, no) => {
                                    setIsID(id);
                                    setIsBookID(bid);
                                    setIsReads(no)
                                    setOpen(!open);
                                }}
                            />
                        </View>
                    </View>
            }
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
    txtNoBook: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
        marginTop: wHeight * 0.01,
    },
    btnAdd: {
        marginTop: wHeight * 0.05,
        backgroundColor: Colors.lightGray,
        height: wHeight * 0.05,
        justifyContent: 'center',
        alignSelf: 'center',
        width: wWidth * 0.6,
        borderRadius: 20
    },
    btnAddTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center'
    },
    dispView: {
        flex: 1,
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wWidth * 0.05,
        marginVertical: wHeight * 0.02,
    },
    txtTitle: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    txtStories: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,
    },
});

export default ReadingListScreen;
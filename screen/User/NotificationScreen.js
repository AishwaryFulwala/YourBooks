import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getNotificationByID } from '../../redux/actions/Notification.action';
import { getBooksByBookID } from '../../redux/actions/Books.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const NotificationScreen = (props) => {
    const noti = useSelector((state) => state.notifications.getNotificationData);
    const book = useSelector((state) => state.books.getBookData.getBooksByBookID);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getNotificationByID());
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    const loadBook = async (id) => {
        try {
            await dispatch(getBooksByBookID(id));
        } catch (error) {
            if(error?.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        if(noti.length) {
            console.log('hi')
            noti.map((val) => {
                loadBook(val.BookID);
            })
        }
    }, [ noti ])

    const displayContain = ({ item, index }) => {
        // console.log(book.length)
        if(book[index]?._id) {
            // console.log(book[index]._id.BookID, item.BookID)
            let date;
            
            if(moment(new Date()).diff(item.NotificationDate, 'days') < 7)
                date = moment(item.NotificationDate).from(new Date());
            else
                date = moment(item.NotificationDate).format("MMM DD, YYYY [at] HH:mm");

            return (
                <TouchableOpacity
                    style={styles.containView}
                    onPress={() => {
                        props.navigation.navigate('BookReadingN', {
                            bookID: item.BookID
                        });
                    }}
                >
                    <Image 
                        source={{uri: book[index]._id.ProfilePic}}
                        style={styles.imgProfile}
                    />
                    <View style={styles.txtView}>
                        <Text style={styles.txtBody}>{item.NotificationBody}</Text>
                        <Text style={styles.txtDate}>{date}</Text>
                    </View>
                    <Image 
                        style={styles.imgBook}
                        source={{uri: book[index]._id.BookPic}}
                    />
                </TouchableOpacity>
            );
        }
    };

    if(!noti || (noti.length && !book)) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }

    return (
        <View style={styles.body}>
            {
                !noti.length ?
                    <View style={styles.activity}>
                        <Text style={styles.txtNoNoti}>No Notification Found</Text>
                    </View>
                :
                <FlatList
                    data={noti}
                    renderItem={displayContain}
                />
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
    txtNoNoti: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
    containView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: wHeight * 0.01,
        paddingHorizontal: wWidth * 0.02,
        marginHorizontal: wWidth * 0.02,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1
    },
    imgProfile: {
        height: wHeight * 0.06,
        width: wHeight * 0.06,
        borderRadius: 50,
    },
    txtView: {
        width: wWidth * 0.6,
        marginLeft: wWidth * 0.01,
    },
    txtBody: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    txtDate: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wWidth * 0.015,
    },
    imgBook: {
        height: wHeight * 0.1,
        width: wWidth * 0.15,
        borderRadius: 5,
        marginLeft: wWidth * 0.01,
        marginVertical: wWidth * 0.01,
    },
});

export default NotificationScreen;
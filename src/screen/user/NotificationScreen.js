import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, Alert, } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getNotificationByID, updateNotification } from '../../redux/actions/Notification.action';

import Fonts from '../../constnats/Fonts';

import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const NotificationScreen = (props) => {
    const Colors = useTheme().colors;

    const noti = useSelector((state) => state?.notifications?.getNotificationData);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getNotificationByID());
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const readHandler = async (id, read, bid) => {
        if(read === true) {
            try {
                await dispatch(updateNotification(id));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }

        props.navigation.navigate('BookReadingN', {
            bookID: bid
        });
    };

    const displayContain = ({ item, index }) => {
        let date;
        if(moment(new Date()).diff(item?._id?.NotificationDate, 'days') < 7)
            date = moment(item?._id?.NotificationDate).from(new Date());
        else
            date = moment(item?._id?.NotificationDate).format("MMM DD, YYYY [at] HH:mm");

        return (
            <TouchableOpacity
                key={index}
                style={styles(Colors).containView}
                onPress={() => readHandler(item?._id?.ID, item?._id?.Status, item._id.BookID)}
            >
                <Image 
                    style={styles(Colors).imgBook}
                    source={{uri: item?._id?.BookPic}}
                />
                <View style={styles(Colors).txtView}>
                    <Text style={{...styles(Colors).txtBody, color: item?._id?.Status ? Colors.titleColor : Colors.fontColor,}}>{item._id.NotificationBody}</Text>
                    <Text style={styles(Colors).txtDate}>{date}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if(!noti) {
        return (
            <View style={styles(Colors).activity}>
                <PageLoader />
            </View>
        );
    }

    return (
        <View style={styles(Colors).body}>
            <Text style={styles(Colors).txtTitle}>Notification</Text>
            {
                !noti?.length ?
                    <View style={styles(Colors).activity}>
                        <Text style={styles(Colors).txtNoNoti}>No Notification Found</Text>
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

const styles = (Colors) => StyleSheet.create({
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
    txtNoNoti: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
    txtTitle: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.08,
        marginTop: wHeight * 0.03,
        textAlign: 'center',
    },
    containView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: wHeight * 0.01,
        paddingHorizontal: wWidth * 0.02,
        marginHorizontal: wWidth * 0.02,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1
    },
    txtView: {
        width: wWidth * 0.7,
        marginLeft: wWidth * 0.05,
    },
    txtBody: {
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    txtDate: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wWidth * 0.015,
    },
    imgBook: {
        height: wHeight * 0.1,
        width: wWidth * 0.15,
        borderRadius: 5,
        marginVertical: wWidth * 0.01,
    },
});

export default NotificationScreen;
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, Alert, } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getNotificationByID } from '../../redux/actions/Notification.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const NotificationScreen = (props) => {
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

    const displayContain = ({ item, index }) => {
        let date;
        if(moment(new Date()).diff(item.NotificationDate, 'days') < 7)
            date = moment(item._id.NotificationDate).from(new Date());
        else
            date = moment(item._id.NotificationDate).format("MMM DD, YYYY [at] HH:mm");

        return (
            <TouchableOpacity
                key={index}
                style={styles.containView}
                onPress={() => {
                    props.navigation.navigate('BookReadingN', {
                        bookID: item._id.BookID
                    });
                }}
            >
                <Image 
                    style={styles.imgBook}
                    source={{uri: item?._id?.BookPic}}
                />
                <View style={styles.txtView}>
                    <Text style={styles.txtBody}>{item._id.NotificationBody}</Text>
                    <Text style={styles.txtDate}>{date}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if(!noti) {
        return (
            <View style={styles.activity}>
                <PageLoader />
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <Text style={styles.txtTitle}>Notification</Text>
            {
                !noti?.length ?
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
        marginVertical: wWidth * 0.01,
    },
});

export default NotificationScreen;
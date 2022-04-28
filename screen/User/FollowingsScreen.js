import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import { getFollow, getID, getUser, updateUser } from '../../redux/actions/users.action';

import FollowList from '../../components/FollowList';
import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const FollowingsScreen = (props) => {
    const userID = props?.route?.params?.userID;
    const id = useSelector((state) => state.users.getUserData.getID);
    const user = useSelector((state) => state.users.getUserData.getUser);
    const follow = useSelector((state) => state.users.getUserData.getFollow);

    const dispatch = useDispatch();

    const load = async () => {
        if(userID) {
            try {
                await dispatch(getID(userID));
            } catch (error) {
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        }

        try {
            await dispatch(getUser());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getFollow(userID || id));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const followHandler = async (val) => {
        try {
            await dispatch(updateUser({Follow: val}));
            load();
        } catch (error) {
            if(error.request?.status === 404)
                return
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    return(
        <View style={styles.body}>
            {
                !(follow?.Followings?.length) ?
                    <View style={styles.activity}>
                        <Text style={styles.txtNoFollow}>No Followings</Text>
                    </View>
                :
                <ScrollView>
                    <FollowList
                        follow={follow?.Followings}
                        onFollow={(val) => {
                            followHandler(val)
                        }}
                        onUser={(val) => {
                            props.navigation.dispatch(
                                StackActions.push('ViewProfileN', {
                                    userID: val,
                                })
                            );
                        }}
                        user={user}
                    />
                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        paddingBottom: wHeight * 0.01,
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
    },
    txtNoFollow: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
});

export default FollowingsScreen;
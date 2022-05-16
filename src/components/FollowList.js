import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import { useTheme } from '@react-navigation/native';

import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const FollowList = (props) => {
    const Colors = useTheme().colors;

    const follow = props.follow
    const user = props.user

    return follow.map((val, index) => {
        const found = user.Followings.find((id) => id === val._id);

        return (
            <TouchableOpacity key={index}
                onPress={() => props.onUser(val._id)}
            >
                <View style={styles(Colors).dispView}>
                    <View style={styles(Colors).imgView}>
                        <Image 
                            source={{ uri: val.ProfilePic }}
                            style={styles(Colors).imgProfile}
                        />
                    </View>
                    <Text
                        style={styles(Colors).txtName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >{val.UserName}</Text>
                    {
                        val._id === user._id ? <View></View> :
                            <TouchableOpacity
                                style={styles(Colors).btn}
                                onPress={() => props.onFollow(val._id)}
                            >
                                <Text style={styles(Colors).btnTxt}>{found ?  'Unfollow' : 'Follow'}</Text>
                            </TouchableOpacity>
                    }
                </View>
            </TouchableOpacity>
        );
    });
};

const styles = (Colors) => StyleSheet.create({
    dispView: {
        paddingHorizontal: wWidth * 0.03,
        paddingVertical: wHeight * 0.015,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgView: {
        height: wHeight * 0.063,
        width: wHeight * 0.063,
        borderWidth: 1,
        borderColor: Colors.titleColor,
        borderRadius: 50,
        backgroundColor: Colors.bodyColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    imgProfile: {
        height: wHeight * 0.06,
        width: wHeight * 0.06,
        borderRadius: 50,
    },
    txtName: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        width: wWidth * 0.47,
        marginLeft: wWidth * 0.05,
    },
    btn: {
        alignItems: 'center',
        width: wWidth * 0.25,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.titleColor,
        borderColor: Colors.titleColor,
        marginHorizontal: wWidth * 0.04,
        paddingVertical: wHeight * 0.01,
        paddingHorizontal: wWidth * 0.05,
    },
    btnTxt: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
    },
});

export default FollowList;
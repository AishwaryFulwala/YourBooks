import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SearchList = (props) => {
    const data = props.data;

    return data.map((val, index) => {
        return (
            <TouchableOpacity
                onPress={() => props.onClick(val._id)}
                key={index}
            >
                <View style={styles.searchListView}>
                    <View style={styles.imgView}>
                        <Image 
                            source={{ uri: val.ProfilePic || val.BookPic }}
                            style={styles.imgProfile}
                        />
                    </View>
                    <Text
                        style={styles.txtName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >{val.UserName || val.BookName}</Text>
                </View>
            </TouchableOpacity>
        );
    });
};

const styles = StyleSheet.create({
    searchListView: {
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
        width: wWidth * 0.73,
        marginLeft: wWidth * 0.05,
    },
});

export default SearchList;
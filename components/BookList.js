import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';
import IconO from 'react-native-vector-icons/Octicons';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const BookList = (props) => {
    const book = props.book;

    return book.map((val, index) => {
        const parts = val.count;
        val = val._id;

        return(
                <View style={styles.container} key={index}>
                    <TouchableOpacity
                        style={styles.bookView}
                        onPress={() => props.onClick(val.BookID)}
                    >
                        <View style={styles.bookShadow}>
                            <Image 
                                source={{uri: val.BookPic}}
                                style={styles.bookImg}
                            />
                        </View>
                        <View style={styles.txtView}>
                            <Text
                                style={styles.bookTitle}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >{val.BookName}</Text>
                            <Text style={styles.bookAuthor}>{val.UserName}</Text>
                            <View style={styles.txtIconView}>
                                <IconF
                                    name='eye'
                                    size={17} 
                                    color={Colors.fontColor}
                                    style={styles.icon}
                                />
                                <Text style={styles.txtIcon}>{val.NoOfReads}</Text>
                                <IconO
                                    name='list-unordered'
                                    size={17} 
                                    color={Colors.fontColor}
                                    style={styles.icon}
                                />
                                <Text style={styles.txtIcon}>{parts}</Text>
                            </View>
                            <Text
                                style={styles.txtDescription}
                                numberOfLines={4}
                                ellipsizeMode='tail'
                            >{val.Description}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.horizontalView}></View>
                </View>
        );
    });
};

const styles = StyleSheet.create({
    container: {
        marginBottom: wHeight * 0.01,
    },
    bookView: {
        width: wWidth * 0.9,
        alignSelf: 'center',
        marginTop: wHeight * 0.03,
        borderRadius: 10,
        flexDirection: 'row',
    },
    bookShadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        position: 'relative',
        marginHorizontal: wWidth * 0.03,
        alignSelf: 'center',
    },
    bookImg: {
        height: wHeight * 0.18,
        width: wWidth * 0.25,
        borderRadius: 5,
    },
    bookTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        width: wWidth * 0.55
    },
    bookAuthor: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wHeight * 0.01,
        fontStyle: 'italic',
    },
    txtDescription: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wHeight * 0.007,
        lineHeight: wHeight * 0.02,
        width: wWidth * 0.55
    },
    txtIconView: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: wHeight * 0.005,
    },
    txtIcon: {
        marginHorizontal: wWidth * 0.02,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wHeight * 0.01,
    },
    txtView: {
        marginTop: wHeight * 0.01,
        marginLeft: wWidth * 0.03,
    },
    horizontalView: {
        borderColor: Colors.fontColor,
        borderWidth: 0.5,
        width: wWidth * 0.9,
        alignSelf: 'center',
        marginTop: wHeight * 0.03,
        backgroundColor: Colors.fontColor,
    }
});

export default BookList;
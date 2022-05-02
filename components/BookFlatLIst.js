import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const BookFlatList = (props) => {
    const book = props.book;

    return(        
        <View>
            {
                book && 
                <FlatList 
                    style={styles.btnBook}
                    numColumns={3}
                    data={book}
                    renderItem={({item, index}) => {
                        console.log(item);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.btnBook}
                                onPress={() => {
                                    props.onList && props.onList(item._id.ID || item._id, item._id.BookID)
                                    props.onBook && props.onBook(item._id.BookID || item.BookID)
                                }}
                            >
                                <View style={styles.bookShadow}>
                                    <Image 
                                        source={{uri: item._id.BookPic || item.BookPic}}
                                        style={styles.bookImg}
                                    />
                                </View>
                                <Text style={styles.txtName}>{item._id.BookName || item.BookName}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    btnBook: {
        marginBottom: wHeight * 0.01,
    },
    bookShadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        position: 'relative',
        marginTop: wHeight * 0.01,
        marginHorizontal: wWidth * 0.039
    },
    bookImg: {
        height: wHeight * 0.18,
        width: wWidth * 0.25,
        borderRadius: 5,
    },
    txtName: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,
        width: wWidth * 0.3,
        marginLeft: wWidth * 0.039,
        marginTop: wHeight * 0.01,
    },
});

export default BookFlatList;
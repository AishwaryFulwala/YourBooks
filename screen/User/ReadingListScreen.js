import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity , FlatList } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const ReadingListScreen = (props) => {
    const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


    return(
        <View style={styles.body}>
            <View style={styles.titleView}>
                <Text style={styles.txtTitle}>Reading List</Text>
                <Text style={styles.txtStories}>36 Stories</Text>
            </View>
            <View>
                <FlatList
                    style={styles.dispView}
                    data={DATA}
                    renderItem={() => {
                        return (
                            <TouchableOpacity>
                                <View style={styles.bookShadow}>
                                    <Image 
                                        source={require('../../assets/image/HomeCover.webp')}
                                        style={styles.bookImg}
                                    />
                                </View>
                                <Text style={styles.txtStories}>Name</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wWidth * 0.05,
        marginTop: wHeight * 0.02,
        marginBottom: wHeight * 0.02,
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
    dispView: {
        borderColor: Colors.fontColor,
        borderWidth: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: wHeight * 0.03,
    },
    bookShadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        position: 'relative',
        marginTop: wHeight * 0.03,
        marginHorizontal: wWidth * 0.039
    },
    bookImg: {
        height: wHeight * 0.18,
        width: wWidth * 0.25,
        borderRadius: 5,
    },
});

export default ReadingListScreen;
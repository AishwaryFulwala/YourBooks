import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator, ScrollView, FlatList } from 'react-native';

import Slider from '@react-native-community/slider';

import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import { getBooksDetailByID } from '../../redux/actions/booksDetail.action';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const BookReadingScreen = (props) => {
    const bookID = props.route.params.bookID;
    const books = useSelector((state) => state.booksDetail.getBooksDetailData);

    const [sliderValue, setSliderValue] = useState(0);
    const [ref, setRef] = useState(null);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksDetailByID(bookID));
        } catch (error) {
            
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const wordsCount = (str) => {
        let arr = str?.split(' ');
        let subStr=arr[0];
        let contain = [];

        for(let i = 1; i < arr.length; i++){
            let word = arr[i];
            if(subStr.length + word.length + 1 <= 420)
                subStr = subStr + ' ' + word;
            else{
                contain.push(subStr);
                subStr = word;
            }
        }

        if(subStr.length)
            contain.push(subStr);

        return contain;
    };

    const dispPart = (item, i, no ,pName) => {
        return (
            <View key={i}>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txtPartNo}
                >
                    {no}. {pName}
                </Text>
                <View style={styles.dispView}>
                    <Text style={styles.txtPartContain}>{item[i]}</Text>
                </View>
            </View>
        )
    }

    const disp = (n, item, no ,pName) => {
        return [...Array(n)].map((_, index) => {
            return dispPart(item, index, no ,pName);
        });
    };

    const displayContain = ({item, index}) => {
        const contain = wordsCount(item.PartContain)

        return (
            <View key={index} style={styles.flatView}>
                {
                    disp(contain.length, contain, item.PartNo ,item.PartName)
                }
            </View>
        );
    };

    if(!books || !books.length) {
        return (

            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }

    return(
        <View style={styles.body}>
            <Text
                style={styles.txtTitle}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{books[0].BookName}</Text>
            <FlatList
                data={books}
                renderItem={displayContain}
                pagingEnabled
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ref={(ref) => {
                    setRef(ref);
                }}
            />
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={books.length - 1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="gray"
                thumbTintColor={Colors.fontColor}
                tapToSeek={true}
                step={1}
                value={sliderValue}
                onValueChange={(sliderValue) => setSliderValue(sliderValue)}
                onSlidingComplete={() => {
                    ref.scrollToIndex({
                        animated: true,
                        index: sliderValue,
                        viewPosition: 0
                    })
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtTitle: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.07,
        marginTop: wHeight * 0.03,
        marginHorizontal: wWidth * 0.04
    },
    flatView: {
        marginTop: wHeight * 0.05,
        flexDirection: 'row',
    },
    dispView: {
        backgroundColor: Colors.bodyColor,
        marginBottom: wHeight * 0.01,
        marginHorizontal: wWidth * 0.05,
        width: wWidth * 0.9,
        height: wHeight * 0.55,
        borderRadius: 10,
        shadowColor: Colors.fontColor,
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 20,
    },
    txtPartNo: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        marginBottom: wHeight * 0.03,
        textAlign: 'center'
    },
    txtPartContain: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginTop: wHeight * 0.02,
        marginHorizontal : wWidth * 0.03,
        lineHeight: wHeight * 0.04,
        textAlign: 'justify',
    },
    slider: {
        width: wWidth,
        marginBottom: wHeight * 0.01,
    }
});

export default BookReadingScreen;
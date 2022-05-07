import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator, ScrollView, FlatList } from 'react-native';

import Slider from '@react-native-community/slider';
import RenderHtml from 'react-native-render-html';

import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import { getBooksDetailByID } from '../../redux/actions/BooksDetail.action';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const BookReadingScreen = (props) => {
    const bookID = props.route.params.bookID;
    const books = useSelector((state) => state.booksDetail.getBooksDetailData);

    const [ sliderValue, setSliderValue ] = useState(0);
    const [ ref, setRef ] = useState(null);
    const [ scrollPosition, setScrollPosition ] = useState(0);

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

    const tagsStyles = {
        div: {
            color: Colors.fontColor,
            fontFamily: Fonts.bodyFont,
            fontSize: wWidth * 0.04,
            marginTop: wHeight * 0.005,
            textAlign: 'justify',
        },
        img: {
            height: wHeight * 0.3,
            width: wWidth * 0.6,
            marginVertical: wHeight * 0.01,
        }
    };

    const displayContain = ({ item, index }) => {
        return (
            <View key={index} style={styles.flatView}>
                <View key={index}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={styles.txtPartNo}
                    >
                        {item.PartNo}. {item.PartName}
                    </Text>
                    <View style={styles.dispView}>
                        <RenderHtml
                            contentWidth={wWidth}
                            source={{html: item.PartContain}}
                            tagsStyles={tagsStyles}
                        />
                    </View>
                </View>
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
const handleRelease = () => {
    // setTimeout(() => {
        // ref.scrollToOffset({ y: 3000 });
    // }, 1000)
}
    return(
        <View style={styles.body}>
            <Text
                style={styles.txtTitle}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{books[0].BookName}</Text>
            {<FlatList
                data={books}
                renderItem={displayContain}
                ref={(ref) => {
                    setRef(ref);
                }}
                // onResponderRelease={handleRelease}
                onScroll={(event) => {
                    setScrollPosition(event.nativeEvent.contentOffset.y)
                }}
                
            />}
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={books.length - 1}
                minimumTrackTintColor={Colors.fontColor}
                maximumTrackTintColor={Colors.lightGray}
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
     activity: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.bodyColor,
    },
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
        borderRadius: 10,
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
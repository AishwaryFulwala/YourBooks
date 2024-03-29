import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, FlatList } from 'react-native';

import { useTheme } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import Slider from '@react-native-community/slider';
import RenderHtml from 'react-native-render-html';

import { useDispatch, useSelector } from 'react-redux';

import { getBooksDetailByID } from '../../redux/actions/BooksDetail.action';

import Fonts from '../../constnats/Fonts';

import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const tagsStyles = {
        div: {
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

const BookReadingScreen = (props) => {
    const Colors = useTheme().colors;

    const bookID = props.route.params.bookID;
    const books = useSelector((state) => state?.booksDetail?.getBooksDetailData);

    const [ sliderValue, setSliderValue ] = useState(0);
    const [ scrollMax, setScrollMax ] = useState(0);
    const [ isLoad, setIsLoad ] = useState(true);

    const ref = useRef();
    const layoutHeight = useRef(null);
    const contentHeight = useRef(null);
    const isNotScrollEnabled= useRef(false)

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksDetailByID(bookID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        const val = JSON.parse(await AsyncStorage.getItem(`@bookScroll${bookID}`));

        setTimeout(() => {
            ref?.current?.scrollToOffset({ animated: true, offset: val?.scroll});
            setSliderValue(val?.scroll);
        }, 100);

        setIsLoad(false)
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const storeData = async (sliderValue) => {
        await AsyncStorage.setItem(`@bookScroll${bookID}`, JSON.stringify({
            scroll: sliderValue, 
        }));
    };

    const displayContain = ({ item, index }) => {
        return (
            <View key={index} style={styles(Colors).flatView}>
                <View>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={styles(Colors).txtPartNo}
                    >
                        {item.PartNo}. {item.PartName}
                    </Text>
                    <View style={styles(Colors).dispView}>
                        <RenderHtml
                            contentWidth={wWidth}
                            source={{html: item.PartContain}}
                            tagsStyles={{...tagsStyles,div:{...tagsStyles.div,color: Colors.fontColor,}}}
                        />
                    </View>
                </View>
            </View>
        );
    };

    if(!books || isLoad) {
        return (
            <View style={styles(Colors).activity}>
                <PageLoader />
            </View>
        );
    }

    return(
        <View style={styles(Colors).body}>
            <Text
                style={styles(Colors).txtTitle}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{books[0]?.BookName}</Text>
            {
                !books?.length ?
                    <View style={styles(Colors).activity}>
                        <Text style={styles(Colors).txtNoBook}>No Parts Found</Text>
                    </View>
                :
                    <View style={styles(Colors).containView}>
                        <FlatList
                            data={books}
                            renderItem={displayContain}
                            ref={ref}
                            onLayout={(event) => {
                                layoutHeight.current = event.nativeEvent.layout.height;
                                if(contentHeight.current){
                                    setScrollMax(contentHeight.current - layoutHeight.current);
                                }
                            }}
                            onContentSizeChange={(_, height) => {
                                contentHeight.current = height;
                                if(layoutHeight.current){
                                    setScrollMax(contentHeight.current - layoutHeight.current);
                                }
                            }}
                            onScroll={(event) => {
                                storeData(event.nativeEvent.contentOffset.y);
                                if(!isNotScrollEnabled.current) {
                                    setSliderValue(event.nativeEvent.contentOffset.y);
                                }
                            }}
                            onMomentumScrollBegin={() => {
                                isNotScrollEnabled.current = false;
                            }}
                        />
                        <Slider
                            style={styles(Colors).slider}
                            minimumValue={0}
                            maximumValue={scrollMax}
                            minimumTrackTintColor={Colors.bookColor}
                            maximumTrackTintColor={Colors.fontColor}
                            thumbTintColor={Colors.bookColor}
                            tapToSeek={true}
                            step={1}
                            value={sliderValue}
                            onSlidingStart ={ () => {
                                isNotScrollEnabled.current = true;
                            }}
                            onSlidingComplete={(value) => {
                                ref.current.scrollToOffset({ animated: true, offset: value});
                                setSliderValue(value);
                            }}
                        />
                    </View>
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
    txtNoBook: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
    containView: {
        flex: 1
    },
    flatView: {
        marginTop: wHeight * 0.03,
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
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, FlatList, Alert, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';

import { deleteSearchHistory, getSearchHistoryByID } from '../../redux/actions/searchHistory.action';
import { getAsyncItem } from '../../redux/actions/users.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SearchScreen = (props) => {
    const [ isCross, setIsCross ] = useState(false);
    const [ isSearch, setIsSearch ] = useState('');
    const [ userAsync, setUserAsync ] = useState(null);

    const history = useSelector((state) => state.searchHistory.getSearchHistoryData);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            setUserAsync(await dispatch(getAsyncItem()));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        const getHistory = async () => {
            try {
                await dispatch(getSearchHistoryByID(userAsync?.id));
            } catch (error) {
                if(error.request?.status !== 404)
                    Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            }
        };

        if(userAsync)
            getHistory();
    }, [ userAsync, history ]);

    const debounce = (search, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => search.apply(this, args), delay);
        }
    };

    const search = () => {
        console.log('search')
    }

    const changeTxt = (txt) => {
        setIsSearch(txt);
        debounce(() => search());
    }

    const deleteHistory = async (data) => {
        try {
            await dispatch(deleteSearchHistory(userAsync?.id, data));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    if(!history) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={Colors.fontColor} />
            </View>
        );
    }

    return(
        <View style={styles.body}>
            <View style={styles.serachView}>
                <IconI
                    name='search-outline'
                    color={Colors.fontColor}
                    size={25}
                    style={styles.searchIcon}
                />
                <TextInput 
                    style={styles.txtSerach}
                    value={isSearch}
                    onChangeText={changeTxt}
                    onPressIn={() => setIsCross(true)}
                />
                {
                    isCross && 
                    <IconF
                        name='x'
                        color={Colors.fontColor}
                        size={15}
                        style={styles.searchIcon}
                        onPress={() => setIsSearch('')}
                    />
                }
            </View>            
            <View style={styles.dispView}>
                {
                    history?.Data &&
                    <View style={styles.historyView}>
                        <Text style={styles.txtRecent}>Recent</Text>
                        <FlatList 
                            data={history.Data}
                            renderItem={({item, index}) => {
                                return (
                                    <View style={styles.flatView} key={index}>
                                        <Text
                                            style={styles.txtData}
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                        >{item}</Text>
                                        <IconF
                                            name='x'
                                            color={Colors.fontColor}
                                            size={15}
                                            style={styles.crosssIcon}
                                            onPress={() => {
                                                deleteHistory(history.Data.filter((val, i) => i !== index));
                                            }}
                                        />
                                    </View>
                                );
                            }}
                        />
                    </View>
                }
            </View>
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
    },
    serachView: {
        borderColor: Colors.fontColor,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: wWidth * 0.03,
        marginVertical: wHeight * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchIcon: {
        marginVertical: wHeight * 0.01,
    },
    txtSerach: {
        width: wWidth * 0.71,
        marginLeft: wWidth * 0.03,
        marginRight: wWidth * 0.02,
        paddingVertical: wHeight * 0.005,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    dispView: {
        backgroundColor: Colors.drakGray,
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    historyView:  {
        flex: 1,
    },
    txtRecent: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        marginHorizontal: wWidth * 0.07,
        marginTop: wHeight * 0.03,
        marginBottom: wHeight * 0.02,
    },
    flatView:  {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtData: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginLeft: wWidth * 0.07,
        marginVertical: wHeight * 0.015,
        width: wWidth * 0.78,
    },
    crosssIcon: {
        marginRight: wWidth * 0.07,
    },
});

export default SearchScreen;
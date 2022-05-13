import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, FlatList, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';

import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';

import { updateSearchHistory, getEmpty, getSearchData, getSearchHistoryByID } from '../../redux/actions/SearchHistory.action';
import { getAsyncItem } from '../../redux/actions/Users.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import SearchList from '../../components/SearchList';
import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const SearchScreen = (props) => {
    const history = useSelector((state) => state?.searchHistory?.getSearchHistoryData?.getHistory);
    const searchData = useSelector((state) => state?.searchHistory?.getSearchHistoryData?.getData);

    const [ isCross, setIsCross ] = useState(false);
    const [ search, setSearch ] = useState('');
    const [ userAsync, setUserAsync ] = useState(null);

    const [ isLoad, setIsLoad ] = useState(true);

    const [index, setIndex] = React.useState(0);
    const [ routes ] = useState([
        { key: 'book', title: 'Book' },
        { key: 'user', title: 'User' },
    ]);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            setUserAsync(await dispatch(getAsyncItem()));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    const getHistory = async () => {
        try {
            await dispatch(getSearchHistoryByID(userAsync?.id));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        if(userAsync)
            getHistory();
    }, [ userAsync ]);

    const crossHandler = () => {
        setSearch('');
        setIndex(0)
        empty();
    }

    const debounce = (search, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => search(args), delay);
        }
    };

    const searchHandler = async (txt) => {
        try {
            await dispatch(getSearchData(txt));
            setIsLoad(false);
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            else
                setIsLoad(false)
        }
    }

    const empty = async () => {
        try {
            await dispatch(getEmpty());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        setIsCross(false)
    }

    const changeTxt = async (txt) => {
        if(!isCross)
            setIsCross(true);

        setSearch(txt);
        setIsLoad(true);

        if(txt)
            debounce(() => searchHandler(txt), 500)();
        else 
            empty()
    }

    const searchSubmit = () => {
        if(search) {
            if(history?.Data) {
                history?.Data?.unshift(search);
                updateHistory(history?.Data);
            }
            else {
                updateHistory([search]);
            }
        }        
    };

    const updateHistory = async (data) => {
        try {
            await dispatch(updateSearchHistory(userAsync?.id, data));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
        
        getHistory();
    };

    const tabs = (props) => {
        return (
            <TabBar 
                {...props}
                style={styles.tabBarView}
                labelStyle={styles.lableStyle}
                indicatorStyle={styles.indicatorStyle}
                activeColor={Colors.bookColor}
                inactiveColor={Colors.fontColor}
            />
        );
    };

    const bookTab = () => {
        if(isLoad) {
            return (
                <View style={styles.activity}>
                    <PageLoader />
                </View>
            );
        }

        if(!searchData?.Book?.length) {
            return (
                <View style={styles.activity}>
                    <Text style={styles.txtNoFound}>No Book Found</Text>
                </View>
            );
        }

        return (
            <View style={styles.body}>
                <SearchList
                    data={searchData?.Book}
                    onClick={(id) => {
                        props.navigation.navigate('BookN', {
                            bookID: id,
                        });
                    }}
                />
            </View>
        );
    };

    const userTab = () => {
        if(isLoad) {
            return (
                <View style={styles.activity}>
                    <PageLoader />
                </View>
            );
        }

        if(!searchData?.User?.length) {
            return (
                <View style={styles.activity}>
                    <Text style={styles.txtNoFound}>No User Found</Text>
                </View>
            );
        }

        return (
            <View style={styles.body}>
                <SearchList
                    data={searchData?.User} 
                    onClick={(id) => {
                        props.navigation.navigate('ViewProfileN', {
                            userID: id,
                        });
                    }}
                />
            </View>
        );
    };
    
    const renderScene = SceneMap({
        book: bookTab,
        user: userTab,
    });

    return(
        <View style={styles.body}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            returnKeyType='search'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={search}
                            autoFocus={true}
                            onChangeText={changeTxt}
                            onSubmitEditing={searchSubmit}
                        />
                        {
                            isCross && 
                            <IconF
                                name='x'
                                color={Colors.fontColor}
                                size={15}
                                style={styles.searchIcon}
                                onPress={crossHandler}
                            />
                        }
                    </View>            
                    <View style={styles.dispView}>
                        {
                            search ?
                                <TabView
                                    navigationState={{ index, routes }}
                                    renderScene={renderScene}
                                    onIndexChange={setIndex}
                                    style={styles.tabView}
                                    renderTabBar={tabs}
                                    keyboardDismissMode='none'
                                />
                            :
                                (history?.Data && !!history?.Data?.length) &&
                                <View style={styles.historyView}>
                                    <View style={styles.recentView}>
                                        <Text style={styles.txtRecent}>Recent</Text>
                                        <TouchableOpacity
                                            onPress={() => updateHistory([])}
                                        >
                                            <Text style={styles.iconClearAll}>Clear All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList 
                                        data={history?.Data}
                                        renderItem={({item, index}) => {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.flatView}
                                                    key={index}
                                                    onPress={() => changeTxt(item)}
                                                >
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
                                                        onPress={() => updateHistory(history?.Data.filter((val, i) => i !== index))}
                                                    />
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
    txtNoFound: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    serachView: {
        borderColor: Colors.fontColor,
        borderWidth: 2,
        borderRadius: 23,
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
    tabView: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: Colors.bodyColor,
    },
    tabBarView: {
        backgroundColor: Colors.bodyColor,
        height: wHeight * 0.05,
        width: wWidth * 0.5,
    },
    lableStyle: {
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,
    },
    indicatorStyle: {
        backgroundColor: Colors.bookColor,
    },
    historyView:  {
        flex: 1,
    },
    recentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wWidth * 0.07,
        marginTop: wHeight * 0.03,
        marginBottom: wHeight * 0.02,
    },
    txtRecent: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    iconClearAll: {
        color: Colors.titleColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
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
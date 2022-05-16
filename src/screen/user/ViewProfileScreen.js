import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import IconF from 'react-native-vector-icons/FontAwesome5';

import { useDispatch, useSelector } from 'react-redux';
import { StackActions, useTheme } from '@react-navigation/native';

import { getBooksByUser } from '../../redux/actions/Books.action';
import { getAsyncItem, getUser, updateUser } from '../../redux/actions/Users.action';

import Fonts from '../../constnats/Fonts';

import BookList from '../../components/BookList';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const ViewProfileScreen = (props) => {
    const Colors = useTheme().colors;

    const userID = props.route.params.userID;
    const user = useSelector((state) => state?.users?.getUserData?.getUser);
    const books = useSelector((state) => state?.books?.getBookData?.getBooksByUser);

    const [ userAsync, setUserAsync ] = useState(null);
    const [ isfollow, setIsFollow ] = useState(false);
    const [ isLoad, setIsLoad ] = useState(true);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            setIsLoad(true);
            setUserAsync(await dispatch(getAsyncItem()));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getUser(userID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
        
        try {
            await dispatch(getBooksByUser(userID));
            setIsLoad(false);
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        if(user?.Followers?.find((val) => val === userAsync?.id))
            setIsFollow(true)
        else
            setIsFollow(false)
    }, [ user ]);

    const followHandler = async () => {
        try {
            await dispatch(updateUser({Follow: user?._id}));
            load();
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    if (isLoad) {
        return (
            <View style={styles(Colors).activity}>
                <SkeletonPlaceholder 
                    highlightColor={Colors.btnGray}
                    backgroundColor={Colors.drakGray}
                >
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={150}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                        position='absolute'
                    />
                    <SkeletonPlaceholder.Item
                        width={100}
                        height={100}
                        borderRadius={100}
                        alignSelf="center"
                        position='relative'
                        marginTop={100}
                    />
                    <SkeletonPlaceholder.Item
                        width={120}
                        height={20}
                        alignSelf="center"
                        marginTop={12}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                        flexDirection='row'
                        justifyContent='center'
                    >
                        <SkeletonPlaceholder.Item
                            width={80}
                            height={20}
                            alignSelf="center"
                            marginTop={12}
                            borderRadius={4}
                            margin={20}
                        />
                        <SkeletonPlaceholder.Item
                            width={80}
                            height={20}
                            alignSelf="center"
                            marginTop={12}
                            borderRadius={4}
                            margin={20}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={50}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={100}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={50}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                </SkeletonPlaceholder>
            </View>
        );
    }
    
    return(
        <View style={styles(Colors).body}>
            <LinearGradient
                colors={[Colors.gradientB1, Colors.gradientB2]}
                style={styles(Colors).liner}
            >
                <View style={styles(Colors).touchView}>
                    <ImageBackground
                        source={{uri: user?.CoverPic}}
                        style={styles(Colors).imgCover}
                    >
                    </ImageBackground>
                </View>
                <View style={styles(Colors).detailView}>
                    <LinearGradient
                        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3, Colors.gradient4, Colors.gradient5]}
                        style={styles(Colors).imglinear}
                    >
                        <View style={styles(Colors).imgView}>
                            <Image
                                source={{uri: user?.ProfilePic}}
                                style={styles(Colors).img}
                            />
                        </View>
                    </LinearGradient>
                    <View style={styles(Colors).dispView}>
                        <View style={styles(Colors).txtView}>
                            <Text style={styles(Colors).txtName}>{user?.UserName}</Text>
                        </View>
                        <View style={styles(Colors).followView}>
                            <View>
                                <Text style={styles(Colors).txtNo}>{books?.length}</Text>
                                <Text style={styles(Colors).txtFollow}>Works</Text>
                            </View>
                            <View style={styles(Colors).pipeView}></View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.dispatch(
                                            StackActions.push('Follow',{
                                                screen: 'Followers',
                                                params: {
                                                    userID: user?._id
                                                }
                                            })
                                        );
                                    }}
                                >
                                    <Text style={styles(Colors).txtNo}>{user?.Followers ? user?.Followers.length : 0}</Text>
                                    <Text style={styles(Colors).txtFollow}>Followers</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles(Colors).pipeView}></View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.dispatch(
                                            StackActions.push('Follow',{
                                                screen: 'Followings',
                                                params: {
                                                    userID: user?._id
                                                }
                                            })
                                        );
                                    }}
                                >
                                    <Text style={styles(Colors).txtNo}>{user?.Followings ? user?.Followings.length : 0}</Text>
                                    <Text style={styles(Colors).txtFollow}>Following</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={styles(Colors).scrollView}>
                            {
                                !!user?.About &&
                                <View style={styles(Colors).aboutView}>
                                    <Text style={styles(Colors).userTxt}>About</Text>
                                    <Text style={styles(Colors).txtDescription}>{user?.About}</Text>
                                </View>
                            }
                            {
                                books && 
                                <View style={styles(Colors).bookView}>
                                    <BookList 
                                        book={books}
                                        onClick={(id) => {
                                            props.navigation.dispatch(
                                                StackActions.push('BookN', {
                                                    bookID: id,
                                                })
                                            );
                                        }}
                                    />
                                </View>
                            }
                        </ScrollView>
                    </View>
                    {
                        userAsync.id === userID ?
                            null
                        :
                            <View style={styles(Colors).followRoundView}>
                                <TouchableOpacity
                                    onPress={followHandler}
                                    style={styles(Colors).followBtn}
                                >
                                    {
                                        isfollow ?
                                            <IconF name='user-check' size={20} color={Colors.fontColor} />
                                        :
                                            <IconF name='user-plus' size={20} color={Colors.fontColor} />
                                    }
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    activity: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        justifyContent: 'center',
        alignContent: 'center'
    },
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    liner: {
        flex: 1
    },
    touchView: {
        zIndex: 1,
        height: wHeight * 0.2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.fontColor,
    },
    imgCover: {        
        height: wHeight * 0.2,
        width: wWidth,
        position: 'absolute',
    },
    detailView: {
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
    },
    imglinear: {
        height: wHeight * 0.117,
        width: wHeight * 0.117,
        position: 'relative',
        marginTop: -(wHeight * 0.055),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    imgView: {
        height: wHeight * 0.113,
        width: wHeight * 0.113,
        borderRadius: 50,
        backgroundColor: Colors.bodyColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    img: {
        height: wHeight * 0.105,
        width: wHeight * 0.105,
        borderRadius: 50,
    },
    dispView: {
        alignItems: 'center',
    },
    txtView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtName: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        paddingHorizontal: wWidth * 0.02,
        paddingTop: wHeight * 0.015,
        paddingBottom: wHeight * 0.01,
    },
    followView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: wHeight * 0.01,
        width: wWidth * 0.7,
    },
    pipeView: {
        borderColor: Colors.fontColor,
        borderWidth: 1
    },
    txtNo: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,     
    },
    txtFollow: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        paddingTop: wWidth * 0.012
    },
    scrollView: {
        marginTop: wHeight * 0.02,
        marginBottom: wHeight * 0.07,
        flex: 1,
    },
    aboutView: {
        marginBottom: wHeight * 0.005,
        width: wWidth * 0.9,
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.05,
        paddingVertical: wHeight * 0.02,
        backgroundColor: Colors.drakGray,
        borderRadius: 10,
    },
    userTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.030,
    },
    txtDescription: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        marginTop: wHeight * 0.007,
        lineHeight: wHeight * 0.02,
        width: wWidth * 0.55
    },
    followRoundView: {
        position: 'absolute',
        right: wWidth * 0.03,
        bottom: wHeight * 0.015,
    },
    followBtn: {
        height: wHeight * 0.057,
        width: wHeight * 0.057,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: Colors.bookColor,
    },
});

export default ViewProfileScreen;
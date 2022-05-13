import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { getBookNameByUser } from '../../redux/actions/Books.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import BookFlatList from '../../components/BookFlatLIst';
import PageLoader from '../../components/PageLoader';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const WritingScreen = (props) => {
    const books = useSelector((state) => state?.books?.getBookData?.getBooksByUser);

    const [ isLoad, setIsLoad ] = useState(true);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            setIsLoad(true);
            await dispatch(getBookNameByUser());
            setIsLoad(false);
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    if(isLoad) {
        return (
            <View style={styles.activity}>
                <PageLoader />
            </View>
        );
    }

    return(
        <View style={styles.body}>
            <View>
                <TouchableOpacity
                    style={styles.btnCreate}
                    onPress={() => {
                        props.navigation.navigate('AddBookN');
                    }}
                >
                    <IconM
                        name='notebook-plus-outline'
                        color={Colors.fontColor}
                        size={27}
                    />
                    <Text style={styles.txtData}>Create a new story</Text>
                </TouchableOpacity>
            </View>
            <View>
                <BookFlatList
                    book={books}
                    onBook={(id) => {
                        props.navigation.navigate('EditBookN', {
                            bookID: id
                        });
                    }}
                />
            </View>
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
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    btnCreate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: wHeight * 0.015,
    },
    txtData: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginLeft: wWidth * 0.05,
        marginVertical: wHeight * 0.015,
        width: wWidth * 0.78,
    },
});

export default WritingScreen;
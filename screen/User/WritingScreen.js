import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';


import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import { getAsyncItem } from '../../redux/actions/Users.action';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const WritingScreen = (props) => {
    const dispatch = useDispatch();

    const load = async () => {
         try {
            await dispatch(getAsyncItem());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    return(
        <View style={styles.body}>
            <Text>lib</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
});

export default WritingScreen;
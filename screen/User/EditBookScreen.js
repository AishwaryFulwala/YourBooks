import React from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditBookScreen = (props) => {
    return(        
        <View>
            <Text>Edit Book</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
});

export default EditBookScreen;
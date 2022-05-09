import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator, ScrollView } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const NotificationScreen = (props) => {
    return (
        <View style={styles.body}>
            
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
});

export default NotificationScreen;
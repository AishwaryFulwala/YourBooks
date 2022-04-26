import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const FollowersScreen = (props) => {
    const userID = props?.route?.params?.userID;
    console.log('userID Followers',userID)
    return(
        <View style={styles.body}>
            <Text>search</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
});

export default FollowersScreen;
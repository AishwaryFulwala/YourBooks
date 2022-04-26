import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const LibraryScreen = (props) => {
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

export default LibraryScreen;
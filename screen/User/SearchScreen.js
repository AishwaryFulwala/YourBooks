import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constnats/Colors';

const SearchScreen = (props) => {
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

export default SearchScreen;
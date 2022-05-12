import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const PageLoader = (props) => {
    return (
        <LottieView
            source={require('../assets/image/loader.json')}
            style={styles.lottie}
            autoPlay
            loop
        />
    );
};

const styles = StyleSheet.create({
    lottie: {
        width: wWidth * 0.5,
        height: wHeight * 0.4,
    },
});

export default PageLoader;
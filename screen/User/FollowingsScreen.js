import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const FollowingsScreen = (props) => {
    const userID = props?.route?.params?.userID;
    console.log('userID Followings',userID)
    return(
        <View style={styles.body}>
            <ScrollView>
                <View style={styles.dispView}>
                    <LinearGradient
                        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3, Colors.gradient4, Colors.gradient5]}
                        style={styles.imglinear}                        
                    >
                        <View style={styles.imgView}>
                            <Image 
                                source={require('../../assets/image/HomeCover.webp')}
                                style={styles.imgProfile}
                            />
                        </View>
                    </LinearGradient>
                    <Text
                        style={styles.txtName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >Aishwarya Fulwala</Text>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnTxt}>Follow</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    dispView: {
        borderWidth: 0.5,
        borderColor: Colors.fontColor,
        paddingHorizontal: wWidth * 0.05,
        paddingVertical: wHeight * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imglinear: {
        height: wHeight * 0.07,
        width: wHeight * 0.07,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    imgView: {
        height: wHeight * 0.067,
        width: wHeight * 0.067,
        borderRadius: 50,
        backgroundColor: Colors.bodyColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    imgProfile: {
        height: wHeight * 0.06,
        width: wHeight * 0.06,
        borderRadius: 50,
    },
    txtName: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        width: wWidth * 0.5,
    },
    btn: {
        borderWidth: 1,
        borderColor: 'white'
    },
    btnTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderWidth: 1,
        borderColor: 'white'
    },
});

export default FollowingsScreen;
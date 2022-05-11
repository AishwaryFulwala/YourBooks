import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import { getCategories } from '../../redux/actions/Categories.action';
import { getUser } from '../../redux/actions/Users.action';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const HomeScreen = (props) => {
    const user = useSelector((state) => state?.users?.getUserData?.getUser);
    const categories = useSelector((state) => state?.categories?.getCategoryData?.getCategories);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getUser());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getCategories());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);
    
    return(
        <View style={styles.body}>
            <Text style={styles.txtTitle}>Welcome, {user?.UserName}</Text>
            <ScrollView>
                <View style={styles.container}>
                    {
                        categories && 
                        categories?.map((val, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.btnCat}
                                    key={index}
                                    onPress={() => {
                                        props.navigation.navigate('CategoryN', {
                                            cateID: val._id
                                        });
                                    }}
                                >
                                    <View style={{...styles.btnView, backgroundColor: Colors.colorArr[index]}}>
                                        <Text style={styles.btnTxt}>{val.CategoryName}</Text>
                                        <Image
                                            source={{uri: val.CategoryPic}}
                                            style={styles.img}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
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
    txtTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.titleFont,
        fontSize: wWidth * 0.08,
        marginTop: wHeight * 0.03,
        marginLeft: wWidth * 0.05,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnCat: {       
        borderRadius: 10,
        width: wWidth * 0.45,
        height: wHeight * 0.11,
        marginTop: wHeight * 0.03,
        marginHorizontal: wWidth * 0.025,
    },
    btnView: {
        width: wWidth * 0.45,
        height: wHeight * 0.11,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute'
    },
    btnTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginLeft: wWidth * 0.03,
        width: wWidth * 0.23,
    },
    img: {
        width: 60,
        height: wHeight * 0.11,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCategories } from '../../redux/actions/Categories.action';

import CustomHeaderButton from '../../components/CustomHeaderButton';

import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const AddCategoryScreen = (props) => {
    const Colors = useTheme().colors;

    const categories = useSelector((state) => state?.categories?.getCategoryData?.getCategories);

    const [ cate, setCate ] = useState(null);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getCategories());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Save'
                            iconName='content-save-check-outline'
                            IconComponent={IconMC}
                            onPress={saveHandler}
                        />
                    </HeaderButtons>
                );                
            },
        });
    }, [ cate ]);

    const saveHandler = () => {
        if(!cate)
            Alert.alert('', 'Please Select Category.', [{ text: 'Okay' }]);
        else
            props.navigation.navigate('AddBookN', cate);
    };

    return(
        <View style={styles(Colors).body}>
            <Text style={styles(Colors).txtTitle}>Categories</Text>
            <ScrollView>
                {
                    categories && 
                    categories?.map((val, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles(Colors).btnCat}
                                    onPress={() => {
                                        setCate({ cateID: val._id, cateName: val.CategoryName})
                                    }}
                                >
                                    <View style={styles(Colors).btnView}>
                                        <Text style={{ ...styles(Colors).btnTxt, color: val._id === cate?.cateID ? Colors.bookColor : Colors.fontColor }}>{val.CategoryName}</Text>
                                        <IconM
                                            name={val._id === cate?.cateID ? 'radio-button-checked' : 'radio-button-unchecked'}
                                            color={val._id === cate?.cateID ? Colors.bookColor : Colors.fontColor}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles(Colors).horizontalView}></View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    txtTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        alignSelf: 'center',
        marginVertical: wHeight * 0.01,
    },
    btnCat: {
        height: wHeight * 0.05,
        marginVertical: wHeight * 0.01,
        marginHorizontal: wWidth * 0.025,
        justifyContent: 'center',
    },
    btnView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: wWidth * 0.025,
        marginRight: wWidth * 0.05,
    },
    btnTxt: {
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginLeft: wWidth * 0.03,
    },
    horizontalView: {
        borderColor: Colors.fontColor,
        borderWidth: 0.5,
        width: wWidth * 0.9,
        alignSelf: 'center',
        marginVertical: wHeight * 0.01,
        backgroundColor: Colors.fontColor,
    }
});

export default AddCategoryScreen;
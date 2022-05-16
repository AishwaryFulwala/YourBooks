import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@react-navigation/native';

import { getCategoryByID } from '../../redux/actions/Categories.action';
import { getBooksByCategory } from '../../redux/actions/Books.action';

import BookList from '../../components/BookList';
import PageLoader from '../../components/PageLoader';

import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const CategoryBooksScreen = (props) => {
    const Colors = useTheme().colors;

    const cateID = props.route.params.cateID;
    const category = useSelector((state) => state?.categories?.getCategoryData?.getCategory);
    const books = useSelector((state) => state?.books?.getBookData?.getBooksByCategory);

    const [ isLoad, setIsLoad ] = useState(true);

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getCategoryByID(cateID));
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getBooksByCategory(cateID));
            setIsLoad(false)
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            else
                setIsLoad(false)
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);
    
    if(isLoad) {
        return (
            <View style={styles(Colors).activity}>
                <PageLoader />
            </View>
        );
    }

    return (
        <View style={styles(Colors).body}>
            <Text style={styles(Colors).txtTitle}>{category?.CategoryName}</Text>
            {
                !books?.length  ?
                    <View style={styles(Colors).activity}>
                        <Text style={styles(Colors).txtNoBook}>No book Found</Text>
                    </View>
                :
                    <ScrollView>
                        <BookList 
                            book={books}
                            onClick={(id) => {
                                props.navigation.navigate('BookN', {
                                    bookID: id,
                                });
                            }}
                        />
                    </ScrollView>
            }
        </View>
    );
};

const styles = (Colors) => StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    txtTitle: {
        color: Colors.bookColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.08,
        marginTop: wHeight * 0.03,
        textAlign: 'center',
    },
    txtNoBook: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
});

export default CategoryBooksScreen;
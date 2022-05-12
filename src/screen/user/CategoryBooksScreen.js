import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { getCategoryByID } from '../../redux/actions/Categories.action';
import { getBooksByCategory } from '../../redux/actions/Books.action';

import BookList from '../../components/BookList';
import PageLoader from '../../components/PageLoader';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const CategoryBooksScreen = (props) => {
    const cateID = props.route.params.cateID;
    const category = useSelector((state) => state?.categories?.getCategoryData?.getCategory);
    const books = useSelector((state) => state?.books?.getBookData?.getBooksByCategory);

    const [ isLoad, setIsLoad ] = useState(false)

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
        } catch (error) {
            if(error.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        if(!books)
            setIsLoad(true)
        else
            setIsLoad(false);
    }, [ books ])

    if(isLoad || !books) {
        return (
            <View style={styles.activity}>
                <PageLoader />
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <Text style={styles.txtTitle}>{category?.CategoryName}</Text>
            {
                (!books?.length)  ?
                    <View style={styles.activity}>
                        <Text style={styles.txtNoBook}>No book Found</Text>
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

const styles = StyleSheet.create({
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
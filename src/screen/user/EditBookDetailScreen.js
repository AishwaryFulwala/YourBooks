import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/Feather';

import { deleteBookDetail, getPartsByID, updateBookDetail } from '../../redux/actions/BooksDetail.action';
import { getBooksByID } from '../../redux/actions/Books.action';

import PicModal from '../../components/PicModal';
import PageLoader from '../../components/PageLoader';

import Fonts from '../../constnats/Fonts';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const EditBookDetailScreen = (props) => {
    const Colors = useTheme().colors;

    const bookID = props.route.params.bookID;
    const book = useSelector((state) => state?.books?.getBookData?.getBooksByID);
    const bookDetail = useSelector((state) => state?.booksDetail?.getBooksDetailData);

    const [data, setData] = useState(bookDetail);
    const [ open, setOpen ] = useState(false);
    const [ id, setID ] = useState('');

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getBooksByID(bookID));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        try {
            await dispatch(getPartsByID(bookID));
        } catch (error) {
            if(error?.request?.status !== 404)
                Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };
    
    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    useEffect(() => {
        setData(bookDetail);
    }, [ bookDetail ]);

    useEffect(() => {
        saveHandler(data);
    }, [ id, open ])

    const saveHandler = async (data) => {
        const res = data.map((val, index) => {
            return new Promise((resolve, reject) => {
                dispatch(updateBookDetail(val._id, {PartNo: index + 1 }))
                .then(resolve, reject);
            })
        })
        
        await Promise.all(res).then(() => {
            load();
        }).catch((error) => {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        });
    }

    const deleteHandler = async (id) => {
        try {
            await dispatch(deleteBookDetail(id));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }

        await load();
        setOpen(!open);
    }

    const renderItem = ({ item, index, drag }) => {
        return (
            <View key={index} style={styles(Colors).containView}>
                <IconI
                    name='menu-outline'
                    size={25}
                    color={Colors.lightGray}
                    onLongPress={drag}
                />
                <Text
                    style={styles(Colors).btnTxt}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    onLongPress={drag}
                >{item.PartName}</Text>
                <IconM
                    name='x'
                    size={20}
                    color={Colors.errorColor}
                    onPress={() => {
                        setOpen(!open);
                        setID(item._id);
                    }}
                />
            </View>
        );
    };

    if(!bookDetail) {
        return (
            <View style={styles(Colors).activity}>
                <PageLoader />
            </View>
        );
    }

    return (
        <View style={styles(Colors).body}>
            <Text style={styles(Colors).txtTitle}>{book[0]?._id.BookName}</Text>
            {
                !bookDetail?.length  ?
                    <View style={styles(Colors).activity}>
                        <Text style={styles(Colors).txtNoBook}>No Parts Found</Text>
                    </View>
                :
                    <DraggableFlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        containerStyle={{flex: 1}}
                        onDragEnd={({ data }) => {
                            saveHandler(data);
                            setData(data);
                        }}
                    />
            }
            <PicModal
                onClose={() => setOpen(!open)}
                visible={open}
            >
                <View style={styles(Colors).mainModalView}>
                    <Text style={styles(Colors).deleteTitle}>Delete Part</Text>
                    <Text style={styles(Colors).deleteTxt}>Are you sure you want to delete this part?</Text>
                    <View style={styles(Colors).btnModalView}>
                        <Text
                            style={styles(Colors).modalBtnTxt}
                            onPress={() => deleteHandler(id)}
                        >Yes</Text>
                        <Text
                            style={styles(Colors).modalBtnTxt}
                            onPress={() => setOpen(!open)}
                        >No</Text>
                    </View>
                </View>
            </PicModal>
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
        fontSize: wWidth * 0.06,
        textAlign: 'center',
        marginVertical: wHeight * 0.03,
    },
    txtNoBook: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        textAlign: 'center',
    },
    containView: {
        backgroundColor: Colors.drakGray,
        flexDirection: 'row',
        paddingHorizontal: wWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: wHeight * 0.07,
    },
    btnTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        marginHorizontal: wWidth * 0.05,
        width: wWidth * 0.66,
    },
    mainModalView: {
        paddingVertical: wHeight * 0.03,
        paddingHorizontal: wHeight * 0.04,
    },
    deleteTitle: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    deleteTxt: {
        marginTop: wHeight * 0.025,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    btnModalView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: wHeight * 0.01,
        paddingTop: wHeight * 0.05,
    },
    modalBtnTxt: {
        marginHorizontal: wWidth * 0.05,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
});

export default EditBookDetailScreen;
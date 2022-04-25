import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { firebase } from '@react-native-firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import { PERMISSIONS, request } from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconI from 'react-native-vector-icons/Ionicons';

import { logout, getUser, updateUser } from '../../redux/actions/users.action';

import Colors from '../../constnats/Colors';
import Fonts from '../../constnats/Fonts';

import EditInput from '../../components/EditInput';
import PicModal from '../../components/PicModal';
import SliderModal from '../../components/SliderModal';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const MyProfileScreen = (props) => {
    const user = useSelector((state) => state.users.getUserData.getUser);
    const [ isUser, setIsUser ] = useState(user ?? {});

    useEffect(() => {
        setIsUser({
            UserName: user?.UserName,
            Email: user?.Email,
            Password: user?.Password,
            ContactNo: user?.ContactNo,
            About: user?.About,
            Followings: user?.Followings?.length,
            Followers: user?.Followers?.length,
            CoverPic: user?.CoverPic,
            ProfilePic: user?.ProfilePic,
        });
                
        if (user !== {} && user?.UserName !== undefined)
            setIsLoad(false)
    }, [ user ]);

    const [ isOPwd, setIsOPwd ] = useState('');
    const [ isNPwd, setIsNPwd ] = useState('');
    const [ isNCPwd, setIsNCPwd ] = useState('');

    const [ isOPwdShow, setIsOPwdShow ] = useState(true);
    const [ isNPwdShow, setIsNPwdShow ] = useState(true);
    const [ isNCPwdShow, setIsNCPwdShow ] = useState(true);

    const [ msg, setMsg ] = useState({});

    const [ isNameEdit, setIsNameEdit ] = useState(true);
    const [ isContactNoEdit, setIsContactNoEdit ] = useState(true);
    const [ isAboutEdit, setIsAboutEdit ] = useState(true);
    const [ pickCover, setPickCover ] = useState(false);
    const [ pickPic, setPickPic ] = useState(false);

    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isPwdEdit, setIsPwdEdit ] = useState(false);
    const [ isLoad, setIsLoad ] = useState(true);

    let imgCover = {uri : isUser.CoverPic};
    let imgProfile = {uri : isUser.ProfilePic};

    const dispatch = useDispatch();

    const load = async () => {
        try {
            await dispatch(getUser());
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data?.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    useEffect(() => {
        props.navigation.addListener('focus', load);
    }, []);

    const logOut = () => {
        dispatch(logout());
        props.navigation.dispatch(
            StackActions.replace('Sign')
        );
    };

    const verifyPermission = async () => {
        const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permission', [{text: 'okay'}])
            return false;
        }
        return true;
    };

    const launchCameraHandler = async () => {
        const hasPermission = verifyPermission()
        
        if(!hasPermission)
            return;

        let img;
        try {
            img = await ImagePicker.launchCamera()
        } catch (error) {
            Alert.alert('', 'Can\'t access Library', [{text: okay}])
            return;
        }

        if(img === undefined || img.assets === undefined){
            return;
        }

        if(pickCover)
            storeImage('CoverPic', img.assets[0]);

        if(pickPic)
            storeImage('ProfilePic', img.assets[0]);     
    };

    const launchImageLibraryHandler = async () => {
        const hasPermission = verifyPermission()
        
        if(!hasPermission)
            return;

        let img;
        try {
            img = await ImagePicker.launchImageLibrary()
        } catch (error) {
            Alert.alert('', 'Can\'t access Library', [{text: okay}])
            return;
        }

        if(img === undefined || img.assets === undefined){
            return;
        }

        if(pickCover)
            storeImage('CoverPic', img.assets[0]);

        if(pickPic)
            storeImage('ProfilePic', img.assets[0]);
    };

    const storeImage = (type, val) => {
        const path = `/Images/${type}/${Date.now() + val.fileName}`;
        const imgRef = firebase.app().storage('gs://yourbooks-f1f3d.appspot.com').ref(path);

        closeModal();
        setIsLoad(true);

        imgRef.putFile(val.uri)
            .then(async () => {
                try {
                    const url = await imgRef.getDownloadURL();
                    updateUserHandler({[type]: url});
                } catch (error) {
                    Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
                }
            })
            .catch((error) => {
                Alert.alert('An error occurred!', 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
            });
    };

    const closeModal = () => {
        setIsOpenModal(!isOpenModal);
        
        if(pickCover)
            setPickCover(!pickCover);

        if(pickPic)
            setPickPic(!pickPic);
    };

    const updateUserHandler = async (value) => {
        const cnoRegex = /^[6-9]\d{9}$/g;
        if(('ContactNo' in value) && (!value.ContactNo.match(cnoRegex) || value.ContactNo === '')){
            setMsg({
                id: 'contactNo',
                error: 'Contact No is not valid.'
            });
            return
        }
        else 
            setMsg({
                id: 'contactNo',
                error: ''
            });

         if(isPwdEdit && isOPwd === ''){
            setMsg({
                id: 'opassword',
                error: 'Password can\'t be empty.'
            });
            return
        }
        else 
            setMsg({
                id: 'opassword',
                error: ''
            });

        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
        if(isPwdEdit && (!isNPwd.match(pwdRegex) || isNPwd === '')){
            setMsg({
                id: 'npassword',
                error: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters.'
            });
            return
        }
        else 
            setMsg({
                id: 'npassword',
                error: ''
            });

        if(isPwdEdit &&  !isNCPwd.match(isNPwd)){
            setMsg({
                id: 'cpassword',
                error: 'Confirm Password must be same as password.'
            });
            return
        }
        else 
            setMsg({
                id: 'cpassword',
                error: ''
            });

        try {
            await dispatch(updateUser(value));
        } catch (error) {
            Alert.alert('An error occurred!', (error && error.data.error) || 'Couldn\'t connect to server.', [{ text: 'Okay' }]);
        }
    };

    const chnagePwdModal = () => {
        return (
            <PicModal
                onClose={() => setIsPwdEdit(!isPwdEdit)}
                visible={isPwdEdit}
            >
                <View style={styles.chnagePwdView}>
                    <Text style={styles.changePwdTitle}>Change Password</Text>
                    <View>
                        <Text style={styles.changePwdTxt}>Old Password</Text>
                        <View style={styles.changePwdView}>
                            <TextInput
                                style={styles.changePwdInput}
                                value={isOPwd}
                                onChangeText={(txt) => setIsOPwd(txt)}
                                secureTextEntry={isOPwdShow}
                            />
                            {
                                isOPwdShow ?
                                    <IconI
                                        name='eye-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsOPwdShow(!isOPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                                :
                                    <IconI
                                        name='eye-off-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsOPwdShow(!isOPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                            }
                        </View>
                        {
                            msg.id === 'opassword' && msg.error !== '' && 
                                <Text style={styles.msgError}>{msg.error}</Text>
                        }
                    </View>
                    <View>
                        <Text style={styles.changePwdTxt}>New Password</Text>
                        <View style={styles.changePwdView}>
                            <TextInput
                                style={styles.changePwdInput}
                                value={isNPwd}
                                onChangeText={(txt) => setIsNPwd(txt)}
                                secureTextEntry={isNPwdShow}
                            />
                            {
                                isNPwdShow ?
                                    <IconI
                                        name='eye-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsNPwdShow(!isNPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                                :
                                    <IconI
                                        name='eye-off-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsNPwdShow(!isNPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                            }
                        </View>
                        {
                            msg.id === 'npassword' && msg.error !== '' && 
                                <Text style={styles.msgError}>{msg.error}</Text>
                        }
                    </View>
                    <View>
                        <Text style={styles.changePwdTxt}>Confirm New Password</Text>
                        <View style={styles.changePwdView}>
                            <TextInput
                                style={styles.changePwdInput}
                                value={isNCPwd}
                                onChangeText={(txt) => setIsNCPwd(txt)}
                                secureTextEntry={isNCPwdShow}
                            />
                            {
                                isNCPwdShow ?
                                    <IconI
                                        name='eye-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsNCPwdShow(!isNCPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                                :
                                    <IconI
                                        name='eye-off-outline'
                                        color={Colors.fontColor}
                                        size={20}
                                        onPress={() => {
                                            setIsNCPwdShow(!isNCPwdShow);
                                        }}
                                        style={styles.changePwdIcon}
                                    />
                            }
                        </View>
                        {
                            msg.id === 'cpassword' && msg.error !== '' && 
                                <Text style={styles.msgError}>{msg.error}</Text>
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.changePwdBtn}
                        onPress={() => {
                            updateUserHandler({ OldPwd: isOPwd, Password: isNPwd });
                        }}
                    >
                        <Text style={styles.changePwdBtnTxt}>Save</Text>
                    </TouchableOpacity>
                </View>
            </PicModal>          
        );
    };

    if (isLoad) {
        return (
            <View style={styles.activity}>
                <SkeletonPlaceholder 
                    highlightColor={Colors.btnGray}
                    backgroundColor={Colors.drakGray}
                >
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={150}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                        position='absolute'
                    />
                    <SkeletonPlaceholder.Item
                        width={100}
                        height={100}
                        borderRadius={100}
                        borderWidth={5}
                        alignSelf="center"
                        position='relative'
                        marginTop={100}
                    />
                    <SkeletonPlaceholder.Item
                        width={120}
                        height={20}
                        alignSelf="center"
                        marginTop={12}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                        flexDirection='row'
                        justifyContent='center'
                    >
                        <SkeletonPlaceholder.Item
                            width={80}
                            height={20}
                            alignSelf="center"
                            marginTop={12}
                            borderRadius={4}
                            margin={20}
                        />
                        <SkeletonPlaceholder.Item
                            width={80}
                            height={20}
                            alignSelf="center"
                            marginTop={12}
                            borderRadius={4}
                            margin={20}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={50}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={100}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                    <SkeletonPlaceholder.Item 
                        width={wWidth * 0.9} 
                        height={50}
                        borderRadius={4} 
                        alignSelf="center"
                        marginBottom={10}
                    />
                </SkeletonPlaceholder>
            </View>
        );
    }

    return(
        <View style={styles.body}>
            <SliderModal 
                op1Txt='Take Photo'
                op2Txt='Chooce from Library'
                op1Press={launchCameraHandler}
                op2Press={launchImageLibraryHandler}
                op1Icon='camera-plus'
                op2Icon='image-multiple'
                visible={isOpenModal}
                onClick={closeModal}
            />
            {
                isPwdEdit && chnagePwdModal()
            }
            <LinearGradient
                colors={[Colors.gradientB1, Colors.gradientB2]}
                style={styles.liner}
            >
                <View style={styles.touchView}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpenModal(!isOpenModal);
                            setPickCover(!pickCover);
                        }} 
                        style={styles.imgCover}
                    >
                        <ImageBackground
                            source={imgCover}
                            style={styles.imgCover}
                        >
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailView}>
                    <LinearGradient
                        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3, Colors.gradient4, Colors.gradient5]}
                        style={styles.imglinear}                        
                    >
                        <View style={styles.imgView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsOpenModal(!isOpenModal);
                                    setPickPic(!pickPic);
                                }}
                                style={styles.img}
                            >
                                <Image
                                    source={imgProfile}
                                    style={styles.img}
                                />
                        </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <View style={styles.dispView}>
                        <View style={styles.txtView}>
                            {
                                isNameEdit ?
                                    <Text style={styles.txtName}>{isUser.UserName}</Text>
                                :
                                    <TextInput
                                        style={styles.txtNameInput}
                                        value={isUser.UserName}
                                        onChangeText={(txt) => {
                                            setIsUser({ ...isUser, UserName: txt })
                                        }}
                                    />
                            }
                            {
                                isNameEdit ?
                                    <IconM
                                        name='edit'
                                        size={25}
                                        color={Colors.fontColor}
                                        onPress={() => setIsNameEdit(!isNameEdit)}
                                    />
                                :
                                    <IconM
                                        name='check'
                                        size={25}
                                        color={Colors.fontColor}
                                        onPress={() => {
                                            updateUserHandler({UserName: isUser.UserName});
                                            setIsNameEdit(!isNameEdit);
                                        }}
                                    />
                            }
                        </View>
                        <View style={styles.followView}>
                            <View>
                                <Text style={styles.txtNo}>{user.Followers ? user.Followers.length : 0}</Text>
                                <Text style={styles.txtFollow}>Followers</Text>
                            </View>
                            <View style={styles.pipeView}></View>
                            <View>
                                <Text style={styles.txtNo}>{user.Followings ? user.Followings.length : 0}</Text>
                                <Text style={styles.txtFollow}>Following</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.linerView}>
                        <View>
                            <View style={styles.emailView}>
                                <Text style={styles.emailTxt}>Email</Text>
                                <Text style={styles.emailInputTxt}>{isUser.Email}</Text>
                            </View>
                            <View style={styles.userView}>
                                <EditInput
                                    txt='Contact No'
                                    value={isUser.ContactNo}
                                    onChangeText={(txt) => {
                                        setIsUser({ ...isUser, ContactNo: txt })
                                    }}
                                    edit={isContactNoEdit}
                                    onEdit={() => setIsContactNoEdit(!isContactNoEdit)}
                                    onSave={() => {                                            
                                        updateUserHandler({ContactNo: isUser.ContactNo});
                                        setIsContactNoEdit(!isContactNoEdit);
                                    }}
                                />
                                {
                                    msg.id === 'contactNo' && msg.error !== '' && 
                                        <Text style={styles.msgError}>{msg.error}</Text>
                                }
                                <View style={styles.horizontalView}></View>
                                <EditInput
                                    txt='About'
                                    value={isUser.About}
                                    onChangeText={(txt) => {
                                        setIsUser({ ...isUser, About: txt })
                                    }}
                                    multiline
                                    numberOfLines={3}
                                    edit={isAboutEdit}
                                    onEdit={() => setIsAboutEdit(!isAboutEdit)}
                                    onSave={() => {                                            
                                        updateUserHandler({About: isUser.About});
                                        setIsAboutEdit(!isAboutEdit);
                                    }}
                                />
                            </View>
                            <View style={styles.logoutView}>
                                <TouchableOpacity
                                    style={styles.logoutBtn}
                                    onPress={() => { setIsPwdEdit(!isPwdEdit) }}>
                                    <Text style={styles.logoutBtnTxt}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logoutView}>
                                <TouchableOpacity style={styles.logoutBtn} onPress={logOut}>
                                    <Text style={styles.logoutBtnTxt}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        justifyContent: 'center',
        alignContent: 'center'
    },
    body: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    chnagePwdView: {
        paddingVertical: wHeight * 0.03,
        alignItems: 'center'
    },
    changePwdTitle: {
        paddingBottom: wHeight * 0.03,
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
    },
    changePwdTxt: {
        width: wWidth * 0.7,
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,
        paddingTop: wHeight * 0.015,
    },
    changePwdView: {
        flexDirection: 'row',
    },
    changePwdInput: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        width: wWidth * 0.7,
        paddingVertical: wHeight * 0.01
    },
    changePwdIcon: {
        marginLeft: -(wWidth * 0.05),
    },
    msgError: {
        width: wWidth * 0.7,
        paddingVertical: wHeight * 0.01,
        fontFamily: Fonts.bodyFont,
        color: Colors.errorColor,
    },
    changePwdBtn: {
        marginTop: wHeight * 0.05,
        marginBottom: wHeight * 0.01,
        backgroundColor: Colors.fontColor,
        height: wHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: wWidth * 0.3,
        borderRadius: 30
    },
    changePwdBtnTxt: {
        color: Colors.bodyColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
    },
    liner: {
        flex: 1
    },
    touchView: {
        zIndex: 1,
        height: wHeight * 0.2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.fontColor,
    },
    imgCover: {        
        height: wHeight * 0.2,
        width: wWidth,
        position: 'absolute',
    },
    detailView: {
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
    },
    imglinear: {
        height: wHeight * 0.117,
        width: wHeight * 0.117,
        position: 'relative',
        marginTop: -(wHeight * 0.055),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    imgView: {
        height: wHeight * 0.113,
        width: wHeight * 0.113,
        borderRadius: 50,
        backgroundColor: Colors.bodyColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    img: {
        height: wHeight * 0.1,
        width: wHeight * 0.1,
        borderRadius: 50,
    },
    dispView: {
        alignItems: 'center',
    },
    txtView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtName: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        paddingHorizontal: wWidth * 0.02,
        paddingTop: wHeight * 0.015,
        paddingBottom: wHeight * 0.01,
    },
    txtNameInput: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.05,
        paddingHorizontal: wWidth * 0.02,
        borderBottomColor: Colors.fontColor,
        borderBottomWidth: 1,
        paddingTop: wHeight * 0.015,
        paddingBottom: wHeight * 0.01
    },
    followView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: wHeight * 0.025,
        width: wWidth * 0.5,
    },
    pipeView: {
        borderColor: Colors.fontColor,
        borderWidth: 1
    },
    txtNo: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.035,     
    },
    txtFollow: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.03,
        paddingTop: wWidth * 0.012
    },
    linerView: {
        marginVertical: wHeight * 0.04,
        flex: 1,
    },
    emailView: {
        marginBottom: wHeight * 0.03,
        width: wWidth * 0.9,
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.05,
        paddingVertical: wHeight * 0.02,
        backgroundColor: Colors.drakGray,
        borderRadius: 10,
    },
    emailTxt: {
        color: Colors.lightGray,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.030,
    },
    emailInputTxt: {
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.04,
        paddingTop: wHeight * 0.01,
        paddingLeft: wWidth * 0.011,
    },
    userView: {
        backgroundColor: Colors.drakGray,
        borderRadius: 15,
        paddingHorizontal: wWidth * 0.05,
    },
    horizontalView: {
        borderColor: Colors.btnGray,
        borderWidth: 1
    },
    logoutView: {
        marginTop: wHeight * 0.03,
    },
    logoutBtn: {
        width: wWidth * 0.9,
        height: wHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wWidth * 0.05,
        backgroundColor: Colors.drakGray,
        borderRadius: 10,
    },
    logoutBtnTxt: {
        textAlign: 'center',
        color: Colors.fontColor,
        fontFamily: Fonts.bodyFont,
        fontSize: wWidth * 0.045,
    },
});

export default MyProfileScreen;
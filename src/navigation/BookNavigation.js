import React from 'react';
import { Image, Platform, useColorScheme } from 'react-native';

import { NavigationContainer, DarkTheme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Fonts from '../constnats/Fonts';
import LightColors from '../constnats/LightColors';
import DarkColors from '../constnats/DarkColors';

import AuthScreen from '../screen/AuthScreen';

import SigninHomeScreen from '../screen/signin/SigninHomeScreen';
import SigninScreen from '../screen/signin/SigninScreen';
import SignupScreen from '../screen/signin/SignupScreen';

import HomeScreen from '../screen/user/HomeScreen';
import SearchScreen from '../screen/user/SearchScreen';
import MyProfileScreen from '../screen/user/MyProfileScreen';
import NotificationScreen from '../screen/user/NotificationScreen';

import CategoryBooksScreen from '../screen/user/CategoryBooksScreen';
import BookScreen from '../screen/user/BookScreen';
import BookReadingScreen from '../screen/user/BookReadingScreen';

import ViewProfileScreen from '../screen/user/ViewProfileScreen';
import FollowersScreen from '../screen/user/FollowersScreen';
import FollowingsScreen from '../screen/user/FollowingsScreen';

import ReadingListScreen from '../screen/user/ReadingListScreen';
import WritingScreen from '../screen/user/WritingScreen';
import EditBookScreen from '../screen/user/EditBookScreen';
import AddBookScreen from '../screen/user/AddBookScreen';
import AddBookDetailScreen from '../screen/user/AddBookDetailScreen';
import AddCategoryScreen from '../screen/user/AddCategoryScreen';
import EditBookDetailScreen from '../screen/user/EditBookDetailScreen';
import NotificationCount from '../components/NotificationCount';

const lightTheme = {
    colors: {
        background: LightColors.bodyColor,
        ...LightColors
    }
}

const darkTheme = {
    dark: true,
    colors: {
        background: DarkColors.bodyColor,
        ...DarkColors
    }
}

const options = (Colors) => ({
    headerTitle: () => {
        return (
            <Image 
                source={require('../assets/image/yourBookLogo.png')}
                style={{height: "100%", width: 150}}
            />
        );
    },
    headerStyle: {
        height: Platform.OS === 'ios' ? 100 : 60,
        backgroundColor: Colors.bodyColor,
    },
    headerTintColor: Colors.fontColor,
    headerBackTitle: ' ',
    headerTitleAlign: 'center',
});

const tabOptions = (Colors) => ({
    tabBarLabelStyle: {
        fontFamily: Fonts.bodyFont,
        fontSize: 13,
    },
    tabBarStyle: { 
        backgroundColor: Colors.bodyColor,
    },
    tabBarIndicatorStyle: {
        backgroundColor: Colors.bookColor,
    },
    tabBarInactiveTintColor: Colors.fontColor,
    tabBarActiveTintColor: Colors.bookColor,
});

const SigninStack = createStackNavigator();
const SigninNavigator = () => {    
    const Colors = useTheme().colors;

    return(
        <SigninStack.Navigator>
            <SigninStack.Screen 
                name='SigninHome'
                component={SigninHomeScreen}
                options={options(Colors)}
            />
            <SigninStack.Screen 
                name='Signup'
                component={SignupScreen}
                options={options(Colors)}
            />
            <SigninStack.Screen 
                name='Signin'
                component={SigninScreen}
               options={options(Colors)}
            />
        </SigninStack.Navigator>
    );
};

const FollowTab = createMaterialTopTabNavigator();
const FollowTabNavigator = () => {
    const Colors = useTheme().colors;

    return (
        <FollowTab.Navigator
            screenOptions={tabOptions(Colors)}
        >
            <FollowTab.Screen 
                name='Followers'
                component={FollowersScreen}
                options={options(Colors)}
            />
            <FollowTab.Screen 
                name='Followings'
                component={FollowingsScreen}
                options={options(Colors)}
            />
        </FollowTab.Navigator>
    );
};

const HomeStack = createStackNavigator();
const HomeNavigator = () => {
    const Colors = useTheme().colors;

    return(
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name='HomeN'
                component={HomeScreen}
                options={options(Colors)}
            />
            <HomeStack.Screen 
                name='CategoryN'
                component={CategoryBooksScreen}
                options={options(Colors)}
            />
            <HomeStack.Screen 
                name='BookN'
                component={BookScreen}
                options={options(Colors)}
            />
            <HomeStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options(Colors)}
            />
            <HomeStack.Screen
                name='ViewProfileN'
                component={ViewProfileScreen}
                options={options(Colors)}
            />
            <HomeStack.Screen
                name='Follow'
                component={FollowTabNavigator}
                options={options(Colors)}
            />
        </HomeStack.Navigator>
    );
};

const SearchStack = createStackNavigator();
const SearchNavigator = () => {
    const Colors = useTheme().colors;

    return(
        <SearchStack.Navigator>
            <SearchStack.Screen 
                name='SearchN'
                component={SearchScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen 
                name='BookN'
                component={BookScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen
                name='ViewProfileN'
                component={ViewProfileScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen
                name='Follow'
                component={FollowTabNavigator}
                options={options(Colors)}
            />
        </SearchStack.Navigator>
    );
};

const MyProfileStack = createStackNavigator();
const MyProfileNavigator = () => {
    const Colors = useTheme().colors;

    return(
        <MyProfileStack.Navigator>
            <MyProfileStack.Screen 
                name='MyProfileN'
                component={MyProfileScreen}
                options={options(Colors)}
            />
            <MyProfileStack.Screen
                name='Follow'
                component={FollowTabNavigator}
                options={options(Colors)}
            />
            <MyProfileStack.Screen
                name='ViewProfileN'
                component={ViewProfileScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen 
                name='BookN'
                component={BookScreen}
                options={options(Colors)}
            />
            <SearchStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options(Colors)}
            />
        </MyProfileStack.Navigator>
    );
};

const LibraryTab = createMaterialTopTabNavigator();
const LibraryTabNavigator = () => {
    const Colors = useTheme().colors;

    return (
        <LibraryTab.Navigator
            screenOptions={tabOptions(Colors)}
        >
            <LibraryTab.Screen 
                name='Read'
                component={ReadingListScreen}
                options={options(Colors)}
            />
            <LibraryTab.Screen 
                name='Write'
                component={WritingScreen}
                options={options(Colors)}
            />
        </LibraryTab.Navigator>
    );
};

const LibraryStack = createStackNavigator();
const LibraryNavigator = () => {
    const Colors = useTheme().colors;

    return(
        <LibraryStack.Navigator>
            <LibraryStack.Screen 
                name='LibraryTab'
                component={LibraryTabNavigator}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='EditBookN'
                component={EditBookScreen}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='AddBookN'
                component={AddBookScreen}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='AddCategoryN'
                component={AddCategoryScreen}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='AddBookDetailN'
                component={AddBookDetailScreen}
                options={options(Colors)}
            />
            <LibraryStack.Screen 
                name='EditBookDetailN'
                component={EditBookDetailScreen}
                options={options(Colors)}
            />
        </LibraryStack.Navigator>
    );
};

const NotificationStack = createStackNavigator();
const NotificationNavigator = () => {
    const Colors = useTheme().colors;

    return(
        <NotificationStack.Navigator>
            <NotificationStack.Screen 
                name='NotificationN'
                component={NotificationScreen}
                options={options(Colors)}
            />
            <NotificationStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options(Colors)}
            />
        </NotificationStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    const Colors = useTheme().colors;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({ 
                headerShown: false,                
                tabBarStyle: { 
                    backgroundColor: Colors.bodyColor,
                },
                tabBarActiveTintColor: Colors.titleColor,
                tabBarInactiveTintColor: Colors.fontColor,
                tabBarHideOnKeyboard: true,
                title: '',
                tabBarIcon: ({ focused, color }) => {
                    if(route.name === 'Home') 
                        return <IconI name={focused ? 'home' : 'home-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'Search') 
                        return <IconI name={focused ? 'search' : 'search-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'Library') 
                        return <IconI name={focused ? 'library' : 'library-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'Notification') 
                        return <NotificationCount focused={focused} color={color} />
                    else if(route.name === 'MyProfile') 
                        return <IconM name={focused ? 'account' : 'account-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                },                
            })}
        >
            <Tab.Screen 
                name='Home'
                component={HomeNavigator}
                options={options(Colors)}
            />
            <Tab.Screen 
                name='Search'
                component={SearchNavigator}
                options={options(Colors)}
            />
            <Tab.Screen 
                name='Library'
                component={LibraryNavigator}
                options={options(Colors)}
            />
            <Tab.Screen 
                name='Notification'
                component={NotificationNavigator}
                options={options(Colors)}
            />
            <Tab.Screen 
                name='MyProfile'
                component={MyProfileNavigator}
                options={options(Colors)}
            />
        </Tab.Navigator>
    );
};

const BookStack = createStackNavigator();
const BookNavigator = (props) => {
    const theme = useColorScheme();
    const Colors = useTheme().colors;

    return(
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme} ref={props.navRef} onReady={props.onReady}>
            <BookStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <BookStack.Screen 
                    name='Auth'
                    component={AuthScreen}
                    options={options(Colors)}
                />
                <BookStack.Screen 
                    name='Sign'
                    component={SigninNavigator}
                    options={options(Colors)}
                />
                <BookStack.Screen
                    name='Tab'
                    component={TabNavigator}
                    options={options(Colors)}
                />
            </BookStack.Navigator>
        </NavigationContainer>
    );
};

export default BookNavigator;
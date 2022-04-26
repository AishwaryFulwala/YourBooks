import React from 'react';
import { Image, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constnats/Colors';
import Fonts from '../constnats/Fonts';

import AuthScreen from '../screen/AuthScreen';

import SigninHomeScreen from '../screen/Log/SigninHomeScreen';
import SigninScreen from '../screen/Log/SigninScreen';
import SignupScreen from '../screen/Log/SignupScreen';

import HomeScreen from '../screen/User/HomeScreen';
import SearchScreen from '../screen/User/SearchScreen';
import LibraryScreen from '../screen/User/LibraryScreen';
import MyProfileScreen from '../screen/User/MyProfileScreen';
import CategoryBooksScreen from '../screen/User/CategoryBooksScreen';
import BookScreen from '../screen/User/BookScreen';
import BookReadingScreen from '../screen/User/BookReadingScreen';
import ViewProfileScreen from '../screen/User/ViewProfileScreen';
import FollowersScreen from '../screen/User/FollowersScreen';
import FollowingsScreen from '../screen/User/FollowingsScreen';

const options = {
    headerTitle: () => {
        return (
            <Image 
                source={require('../assets/image/yourbooklogo.png')}
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
};

const SigninStack = createStackNavigator();
const SigninNavigator = () => {
    return(
        <SigninStack.Navigator>
            <SigninStack.Screen 
                name='SigninHome'
                component={SigninHomeScreen}
                options={options}
            />
            <SigninStack.Screen 
                name='Signup'
                component={SignupScreen}
                options={options}
            />
            <SigninStack.Screen 
                name='Signin'
                component={SigninScreen}
                options={options}
            />
        </SigninStack.Navigator>
    );
};

const FollowTab = createMaterialTopTabNavigator();
const FollowNavigator = () => {
    return (
        <FollowTab.Navigator
            screenOptions={{
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
            }}
        >
            <FollowTab.Screen 
                name='Followers'
                component={FollowersScreen}
                options={options}
            />
            <FollowTab.Screen 
                name='Followings'
                component={FollowingsScreen}
                options={options}
            />
        </FollowTab.Navigator>
    );
};

const HomeStack = createStackNavigator();
const HomeNavigator = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name='HomeN'
                component={HomeScreen}
                options={options}
            />
            <HomeStack.Screen 
                name='CategoryN'
                component={CategoryBooksScreen}
                options={options}
            />
            <HomeStack.Screen 
                name='BookN'
                component={BookScreen}
                options={options}
            />
            <HomeStack.Screen 
                name='BookReadingN'
                component={BookReadingScreen}
                options={options}
            />
            <HomeStack.Screen
                name='ViewProfileN'
                component={ViewProfileScreen}
                options={options}
            />
            <HomeStack.Screen
                name='Follow'
                component={FollowNavigator}
                options={options}
            />
        </HomeStack.Navigator>
    );
};

const SearchStack = createStackNavigator();
const SearchNavigator = () => {
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen 
                name='SearchN'
                component={SearchScreen}
                options={options}
            />
        </SearchStack.Navigator>
    );
};

const MyProfileStack = createStackNavigator();
const MyProfileNavigator = () => {
    return(
        <MyProfileStack.Navigator>
            <MyProfileStack.Screen 
                name='MyProfileN'
                component={MyProfileScreen}
                options={options}
            />
        </MyProfileStack.Navigator>
    );
};

const LibraryStack = createStackNavigator();
const LibraryNavigator = () => {
    return(
        <LibraryStack.Navigator>
            <LibraryStack.Screen 
                name='LibraryN'
                component={LibraryScreen}
                options={options}
            />
        </LibraryStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({ 
                headerShown: false,                
                tabBarStyle: { 
                    backgroundColor: Colors.bodyColor,
                },
                tabBarActiveTintColor: Colors.titleColor,
                tabBarInactiveTintColor: Colors.fontColor,
                title: '',
                tabBarIcon: ({ focused, color }) => {
                    if(route.name === 'Home') 
                        return <IconI name={focused ? 'home' : 'home-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'Search') 
                        return <IconI name={focused ? 'search' : 'search-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'Library') 
                        return <IconI name={focused ? 'library' : 'library-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                    else if(route.name === 'MyProfile') 
                        return <IconM name={focused ? 'account' : 'account-outline'} size={focused ? 30 : 25} color={color} style={{ marginTop: 4 }} />
                },
                
            })}
        >
            <Tab.Screen 
                name='Home'
                component={HomeNavigator}
                options={options}
            />
            <Tab.Screen 
                name='Search'
                component={SearchNavigator}
                options={options}
            />
            <Tab.Screen 
                name='Library'
                component={LibraryNavigator}
                options={options}
            />
            <Tab.Screen 
                name='MyProfile'
                component={MyProfileNavigator}
                options={options}
            />
        </Tab.Navigator>
    );
};

const BookStack = createStackNavigator();
const BookNavigator = () => {
    return(
        <NavigationContainer>
            <BookStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <BookStack.Screen 
                    name='Auth'
                    component={AuthScreen}
                    options={options}
                />
                <BookStack.Screen 
                    name='Sign'
                    component={SigninNavigator}
                    options={options}
                />
                <BookStack.Screen
                    name='Tab'
                    component={TabNavigator}
                    options={options}
                />
            </BookStack.Navigator>
        </NavigationContainer>
    );
};

export default BookNavigator;
import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../services/Api";

export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';
export const GET_FOLLOW = 'GET_FOLLOW';
export const UPDATE_USER = 'UPDATE_USER';

const saveToStorage = (token, email, id) => {
    AsyncStorage.setItem('@userData', JSON.stringify({
        token,
        email,
        id
    }));
};

const getAsyncData = async () => {
    let userData = await AsyncStorage.getItem('@userData');
    return JSON.parse(userData);
};

export const signup = (userName, contactNo, email, password) => {
    return async (dispatch) => {
        try {
            const res = await Api('/signup', {
                UserName: userName,
                ContactNo : contactNo,
                Email: email,
                Password: password,
            }, 'POST');
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const signin = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await Api('/signin', {
                Email: email,
                Password: password,
            }, 'POST');

            saveToStorage(res.data.token, email, res.data.id);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const logout = () => {
    AsyncStorage.removeItem('@userData');
    return {
        type: LOGOUT,
    }    
};

export const getUser = (id = 0) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getUser/${id !== 0 ? id : userData.id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_USER,
                user: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const getFollow = (fid) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getFollow/${userData.id}/${fid}`, {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                }
            }, 'GET');

            dispatch({
                type: GET_FOLLOW,
                user: res.data,
            });
            
            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const updateUser = (user) => {
    return async (dispatch) => {
        const userData = await getAsyncData();
        try {
            const res = await Api(`/updateUser/${userData.id}`, {
                user,           
            }, 'PATCH', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                },
            });

            dispatch({
                type: GET_USER,
                user,
            });

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    };
};
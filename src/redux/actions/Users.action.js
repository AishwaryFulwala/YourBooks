import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../services/Api";

export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';
export const GET_FOLLOW = 'GET_FOLLOW';
export const GET_ASYNC_DATA = 'GET_ASYNC_DATA'
export const GET_ID = 'GET_ID';

const saveToStorage = (token, email, id) => {
    AsyncStorage.setItem('@userData', JSON.stringify({
        token,
        email,
        id
    }));
};

export const getAsyncData = async () => {
    return JSON.parse(await AsyncStorage.getItem('@userData'));
};

export const getAsyncItem = () => {
    return async () => {
        return await getAsyncData();
    }    
};

export const signup = (userName, email, password) => {
    return async () => {
        try {
            await Api('/signup', {
                UserName: userName,
                Email: email,
                Password: password,
            }, 'POST');
        } catch (error) {
            return await Promise.reject(error.response);
        }
    }
};

export const signin = (email, password) => {
    return async () => {
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

export const getFollow = (id) => {
    return async (dispatch) => {
        const userData = await getAsyncData();

        try {
            const res = await Api(`/getFollow/${id}`, {
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
    return async () => {
        const userData = await getAsyncData();
        try {
            const res = await Api(`/updateUser/${userData.id}`, {
                user,           
            }, 'PATCH', {
                headers: {
                    'Authorization' : 'Bearer ' + userData.token
                },
            });

            return await Promise.resolve(res.data);
        } catch (error) {
            return await Promise.reject(error.response);
        }
    };
};

export const getID = (id) => {
    return {
        type: GET_ID,
        id
    }
}
import { GET_ASYNC_DATA, GET_FOLLOW, GET_ID, GET_USER, LOGOUT, UPDATE_USER } from '../actions/Users.action';
import { stateInit } from '../states/InitState';

const UsersReducer = (state = stateInit, action) => {
    switch (action.type) {       
        case LOGOUT:
            return stateInit;

        case GET_USER:
            return {
                getUserData: {
                    ...state.getUserData,
                    getUser: {
                        ...action.user,
                    }
                }
            }

        case GET_FOLLOW:
            return {
                getUserData: {
                    ...state.getUserData,
                    getFollow: {
                        ...action.user,
                    }
                }
            }

        case GET_ASYNC_DATA:
            return {
                getUserData: {
                    ...state.getUserData,
                    getAsync: {
                        ...action.user,
                    }
                }
            }

        case GET_ID:
            return {
                getUserData: {
                    ...state.getUserData,
                    getID: action.id,
                }
            }

        default:
            return state;
    }
};

export default UsersReducer;
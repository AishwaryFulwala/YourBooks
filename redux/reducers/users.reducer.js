import { GET_FOLLOW, GET_USER, LOGOUT, UPDATE_USER } from '../actions/users.action';
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
            
        case UPDATE_USER:
            return {
                getUserData: {
                    ...state.getUserData,
                    getUser: {
                        ...state.getUserData.getUser,
                        ...action.user,
                    }
                }
            }

        default:
            return state;
    }
};

export default UsersReducer;
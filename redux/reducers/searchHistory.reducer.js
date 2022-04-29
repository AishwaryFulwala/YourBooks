
import { GET_SEARCH_DATA, GET_SEARCH_HISTORY } from '../actions/SearchHistory.action';
import { stateInit } from '../states/InitState';

const SearchHistoryReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_SEARCH_HISTORY:
            return {
                getSearchHistoryData: {
                    ...state.getSearchHistoryData,
                    getHistory: {
                        ...action.history,
                    }
                }
            }

        case GET_SEARCH_DATA:
            return {
                getSearchHistoryData: {
                    ...state.getSearchHistoryData,
                    getData: {
                        ...action.data,
                    }
                }
            }

        default:
            return state;
    }
};

export default SearchHistoryReducer;
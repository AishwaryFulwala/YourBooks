
import { GET_SEARCH_HISTORY } from '../actions/searchHistory.action';
import { stateInit } from '../states/InitState';

const SearchHistoryReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_SEARCH_HISTORY:
            return {
                getSearchHistoryData: {
                    ...action.history
                }
            }

        default:
            return state;
    }
};

export default SearchHistoryReducer;
import { CHANGE, GET_READING_LIST_BY_ID } from '../actions/readingList.action';
import { stateInit } from '../states/InitState';

const ReadingListReducer = (state = stateInit, action) => {
    switch (action.type) {            
        case GET_READING_LIST_BY_ID:
            return {
                getReadingListData: {
                    ...action.list,
                }
            }

        case CHANGE:
            return {
                getReadingListData: {
                    ...action.list,
                }
            }

        default:
            return state;
    }
};

export default ReadingListReducer;
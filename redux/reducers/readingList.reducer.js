import { CHANGE, GET_READING_LIST_BY_ID, GET_READING_LIST_BY_USER_ID } from '../actions/ReadingList.action';
import { stateInit } from '../states/InitState';

const ReadingListReducer = (state = stateInit, action) => {
    switch (action.type) {            
        case GET_READING_LIST_BY_ID:
            return {
                getReadingListData: {
                    ...action.list,
                }
            }

        case GET_READING_LIST_BY_USER_ID:
            return {
                getReadingListData: [
                    ...action.list,
                ]
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
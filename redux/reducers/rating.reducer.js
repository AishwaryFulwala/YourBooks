import { GET_AVG_RATING, GET_RATING_BY_BOOK } from '../actions/rating.action';
import { stateInit } from '../states/InitState';

const RatingReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_AVG_RATING:
            return {
                getRatingData: {
                    ...state.getRatingData,
                    getAvgRating: [
                        ...action.rating,
                    ]
                }
            }
        
        case GET_RATING_BY_BOOK:
            return {
                getRatingData: {
                    ...state.getRatingData,
                    getRatingByBook: [
                        ...action.rating,
                    ]
                }
            }
        
        default:
            return state;
    }
};

export default RatingReducer;
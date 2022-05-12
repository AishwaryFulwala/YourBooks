import { GET_BOOKS_DETAIL_BY_ID, GET_PARTS_BY_ID } from '../actions/BooksDetail.action';
import { stateInit } from '../states/InitState';

const BooksDetailReducer = (state = stateInit, action) => {
    switch (action.type) {            
        case GET_BOOKS_DETAIL_BY_ID:
            return {
                getBooksDetailData: [
                    ...action.books,
                ]
            }

        case GET_PARTS_BY_ID:
            return {
                getBooksDetailData: [
                    ...action.books,
                ]
            }

        default:
            return state;
    }
};

export default BooksDetailReducer;
import { GET_BOOKS_BY_CATEGORY, GET_BOOKS_BY_ID, GET_BOOKS_BY_USER } from '../actions/Books.action';
import { stateInit } from '../states/InitState';

const BooksReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_BOOKS_BY_CATEGORY:
            return {
                getBookData: {
                    ...state.getBookData,
                    getBooksByCategory: [
                        ...action.books,
                    ]
                }
            }
        
        case GET_BOOKS_BY_ID:
            return {
                getBookData: {
                    ...state.getBookData,
                    getBooksByID: [
                        ...action.books,
                    ]
                }
            }

        case GET_BOOKS_BY_USER:
            return {
                getBookData: {
                    ...state.getBookData,
                    getBooksByUser: [
                        ...action.books,
                    ]
                }
            }

        default:
            return state;
    }
};

export default BooksReducer;
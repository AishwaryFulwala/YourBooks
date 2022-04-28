import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import UsersReducer from '../reducers/users.reducer';
import CategoriesReducer from "../reducers/categories.reducer";
import BooksReducer from "../reducers/books.reducer";
import RatingReducer from "../reducers/rating.reducer";
import ReadingListReducer from "../reducers/readingList.reducer";
import BooksDetailReducer from "../reducers/booksDetail.reducer";
import SearchHistoryReducer from "../reducers/searchHistory.reducer";

const rootReducer = combineReducers({
    users: UsersReducer,
    categories: CategoriesReducer,
    books: BooksReducer,
    ratings: RatingReducer,
    readingList: ReadingListReducer,
    booksDetail: BooksDetailReducer,
    searchHistory: SearchHistoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
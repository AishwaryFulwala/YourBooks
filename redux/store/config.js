import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import UsersReducer from '../reducers/Users.reducer';
import CategoriesReducer from "../reducers/Categories.reducer";
import BooksReducer from "../reducers/Books.reducer";
import RatingReducer from "../reducers/Rating.reducer";
import ReadingListReducer from "../reducers/ReadingList.reducer";
import BooksDetailReducer from "../reducers/BooksDetail.reducer";
import SearchHistoryReducer from "../reducers/SearchHistory.reducer";
import NotificationReducer from "../reducers/Notification.reducer";

const rootReducer = combineReducers({
    users: UsersReducer,
    categories: CategoriesReducer,
    books: BooksReducer,
    ratings: RatingReducer,
    readingList: ReadingListReducer,
    booksDetail: BooksDetailReducer,
    searchHistory: SearchHistoryReducer,
    notifications: NotificationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
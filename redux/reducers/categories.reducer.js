import { GET_CATEGORIES, GET_CATEGORY } from '../actions/Categories.action';
import { stateInit } from '../states/InitState';

const CategoriesReducer = (state = stateInit, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                getCategoryData: {
                    ...state.getCategoryData,
                    getCategories: [
                        ...action.categories,
                    ]
                }
            }

         case GET_CATEGORY:
            return {
                getCategoryData: {
                    ...state.getCategoryData,
                    getCategory: {
                        ...state.getCategoryData.getCategory,
                        ...action.category,
                    }
                }
            }

        default:
            return state;
    }
};

export default CategoriesReducer;
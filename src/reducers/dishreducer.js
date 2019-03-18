import {
    FETCH_DISHES_START,
    FETCH_DISHES_SUCCESS,
    FETCH_DISHES_FAILED,
    FETCH_CATEGORY_START,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILED
} from "../actions/dishaction";

// import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {}

const Dishes = (loading, dishes, error) => ({ loading, dishes, error });

const dishesData = (state = initState, action) => {
    switch (action.type) {
        case FETCH_DISHES_START: return Object.assign({}, state, { [action.id]: Dishes(true, null, null) });
        case FETCH_DISHES_SUCCESS: return Object.assign({}, state, { [action.id]: Dishes(false, action.dishes, null) });
        case FETCH_DISHES_FAILED: return Object.assign({}, state, { [action.id]: Dishes(false, null, action.error) });
        default: return state;
    }
}

const initCategoryState = {}

const Category = (loading, category, error) => ({ loading, category, error });

const categoryData = (state = initCategoryState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_START: return Object.assign({}, state, { [action.id]: Category(true, null, null) });
        case FETCH_CATEGORY_SUCCESS: return Object.assign({}, state, { [action.id]: Category(false, action.category, null) });
        case FETCH_CATEGORY_FAILED: return Object.assign({}, state, { [action.id]: Category(false, null, action.error) });
        default: return state;
    }
}

// const initAdditiveData = {

// }

// const additiveData = () => {}

export { dishesData, categoryData }
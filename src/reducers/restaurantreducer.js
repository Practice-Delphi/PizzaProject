import {
    FETCH_RESTAURANT_START,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_FAILED,
    RESTAURANT_CHANGE_START,
    RESTAURANT_CHANGE_SUCCESS,
    RESTAURANT_CHANGE_FAILED,
    RESTAURANT_LOGOUPLOAD_START,
    RESTAURANT_LOGOUPLOAD_SUCCESS,
    RESTAURANT_LOGOUPLOAD_FAILED,
    RESTAURANT_PHOTOSUPLOAD_START,
    RESTAURANT_PHOTOSUPLOAD_SUCCESS,
    RESTAURANT_PHOTOSUPLOAD_FAILED,
} from '../actions/restaurantaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

export const restaurantsInitState = {
    loading: false,
    error: null,
    restaurants: []
}

const restaurantsData = (state = restaurantsInitState, action) => {
    switch (action.type) {
        case FETCH_RESTAURANT_START: return Object.assign({}, state, { loading: true });
        case FETCH_RESTAURANT_SUCCESS: return Object.assign({}, state, { loading: false, restaurants: action.restaurants });
        case FETCH_RESTAURANT_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, restaurantsInitState);
        default: return state;
    }
}

export const restaurantStatusInitState = {
    data: {
        loading: false,
        success: null,
        error: null,
    },
    logo: {
        loading: false,
        success: null,
        error: null,
    },
    images: {
        loading: false,
        success: null,
        error: null,
    }
}

const createStatus = (loading, success, error) => ({ loading, success, error });

const restaurantStatus = (state = restaurantStatusInitState, action) => {
    switch (action.type) {
        case RESTAURANT_CHANGE_START: return Object.assign({}, state, { data: createStatus(true, null, null) });
        case RESTAURANT_CHANGE_SUCCESS: return Object.assign({}, state, { data: createStatus(false, action.success, null) });
        case RESTAURANT_CHANGE_FAILED: return Object.assign({}, state, { data: createStatus(false, null, action.error) });

        case RESTAURANT_LOGOUPLOAD_START: return Object.assign({}, state, { logo: createStatus(true, null, null) });
        case RESTAURANT_LOGOUPLOAD_SUCCESS: return Object.assign({}, state, { logo: createStatus(false, action.success, null) });
        case RESTAURANT_LOGOUPLOAD_FAILED: return Object.assign({}, state, { logo: createStatus(false, null, action.error) });

        case RESTAURANT_PHOTOSUPLOAD_START: return Object.assign({}, state, { images: createStatus(true, null, null) });
        case RESTAURANT_PHOTOSUPLOAD_SUCCESS: return Object.assign({}, state, { images: createStatus(false, action.success, null) });
        case RESTAURANT_PHOTOSUPLOAD_FAILED: return Object.assign({}, state, { images: createStatus(false, null, action.error) });

        case CLEAR_ALL: return Object.assign({}, restaurantStatusInitState);
        default: return state;
    }
}

export { restaurantsData, restaurantStatus }
import {
    PHOTO_FETCH_START,
    PHOTO_FETCH_SUCCESS,
    PHOTO_FETCH_FAILED,
} from '../actions/photoaction';

import { CLEAR_ALL  } from '../actions/authaction';

const  initState = { }

const photo = (loading, url, error) => ({ loading, url, error });

const photosData = (state = initState, action) => {
    switch (action.type) {
        case PHOTO_FETCH_START: return Object.assign({}, state, { [action.id]: photo(true, null, null) });
        case PHOTO_FETCH_SUCCESS: return Object.assign({}, state, { [action.id]: photo(false, action.url, null) });
        case PHOTO_FETCH_FAILED: return Object.assign({}, state, { [action.id]: photo(true, null, action.error) });
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { photosData };
import {
    UPDATE_FETCH_START,
    UPDATE_FETCH_SUCCESS,
    UPDATE_FETCH_FAILD,
} from '../actions/chengeaction'
import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

export const initState = {
    loading: false,
    success: null,
    error: null,
}

const chengeddata = (state = initState, action ) => {
    switch (action.type) {
        case UPDATE_FETCH_START : return Object.assign({}, state, { loading: true });
        case UPDATE_FETCH_SUCCESS : return Object.assign({}, state, { loading: false, success: action.success });
        case UPDATE_FETCH_FAILD : return Object.assign({}, state, { loading: false, error: action.error });
        default: return state;
    }
}

export { chengeddata }
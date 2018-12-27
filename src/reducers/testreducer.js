import { TEST_ACTION } from '../actions/testaction'

export const testInitState = {
    message: '',
    error: null,
}

const testData = (state = testInitState, action) => {
    switch (action.type){
        case TEST_ACTION: return Object.assign({}, state, { message: action.message, error: null});
        default: return state;
    }
}

export { testData };
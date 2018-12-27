// Index.js compose all custome reducers in one

import { combineReducers } from 'redux';

// here import custom reducers
import { testData } from './testreducer'
import { historyData } from './historyreducer';

// Here combine custom reducers
export default combineReducers({
    testData,
    historyData,
});
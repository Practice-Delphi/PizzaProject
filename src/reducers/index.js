// Index.js compose all custome reducers in one

import { combineReducers } from 'redux';

// here import custom reducers
import { testData } from './testreducer'
import { historyData } from './historyreducer';
import { tokenData, userData, registerData } from "./authreducer";
import { chengeddata } from './chengereducer';
// Here combine custom reducers
export default combineReducers({
    testData,
    historyData,
    tokenData, 
    userData,
    registerData,
    chengeddata
});
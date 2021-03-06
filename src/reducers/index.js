// Index.js compose all custome reducers in one

import { combineReducers } from 'redux';

// here import custom reducers
import { testData } from './testreducer'
import { historyData } from './historyreducer';
import { tokenData, userData, registerData } from "./authreducer";
import { chengeddata } from './chengereducer';
import { vehData } from './vehiclereducer';
import { photosData } from './photoreduser';
import { restaurantsData, restaurantStatus} from './restaurantreducer';
import { docData } from './docreducer';
import { dishesData, categoryData, categoryStatus } from "./dishreducer";

// Here combine custom reducers
export default combineReducers({
    testData,
    historyData,
    tokenData, 
    userData,
    registerData,
    chengeddata,
    vehData,
    photosData,
    restaurantsData,
    restaurantStatus,
    docData,
    dishesData,
    categoryData,
    categoryStatus,
});
import bills       from './bill-reducer.js';
import legis       from './legis-reducer.js';
import votes       from './vote-reducer.js';
import citizen     from './citizen-reducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    bills,
    legis,
    votes,
    citizen
});
 
export default rootReducer;

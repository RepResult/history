import rootReducer     from '../reducers';
import middleware      from '../middleware';
import { createStore } from 'redux';

export default (initialState) => {
    return createStore(rootReducer, initialState, middleware);
};

import * as types from '../actions/action-types.js';

export const initial = {
    items:          [],
    isRequesting:   false,
    error:          false
};

export default (state = initial, action) => {
    switch (action.type) {
    case types.GET_LEGIS:
        return Object.assign({}, state, {
            isRequesting: true
        });
    case types.SUCCESS_GET_LEGIS:
        return Object.assign({}, state, {
            items: action.data,
            isRequesting: false
        });
    case types.ERROR_GET_LEGIS:
        return Object.assign({}, state, {
            isRequesting: false,
            error: action.data
        });
    default:
        return state;
    }
};

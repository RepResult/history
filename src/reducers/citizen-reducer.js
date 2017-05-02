import * as types from '../actions/action-types.js';

export const initial = {
    zip:            60601,
    geo:            { lat: null, lon: null },
    isRequesting:   false,
    error:          false
};

export default (state = initial, action) => {
    switch (action.type) {
    case types.GET_CITIZEN_LOC:
        return Object.assign({}, state, {
            isRequesting: true
        });
    case types.SUCCESS_GET_CITIZEN_GEO:
        return Object.assign({}, state, {
            geo:            action.data,
            isRequesting:   false
        });
    case types.SUCCESS_GET_CITIZEN_ZIP:
        return Object.assign({}, state, {
            zip:            action.data,
            isRequesting:   false
        });
    case types.ERROR_GET_CITIZEN_LOC:
        return Object.assign({}, state, {
            isRequesting: false,
            error: action.data
        });
    default:
        return state;
    }
};

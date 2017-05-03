import * as types from '../actions/action-types.js';

export const initial = {
    items:          [],
    isRequesting:   false,
    error:          false
};

export default (state = initial, action) => {
    switch (action.type) {
    case types.GET_VOTES:
        return Object.assign({}, state, {
            isRequesting: true
        });
    case types.SUCCESS_GET_VOTES:
        return Object.assign({}, state, {
            items: state.items.concat(action.data)
                .filter((v, i, a) => a.indexOf(v) === i),
            isRequesting: false
        });
    case types.ERROR_GET_VOTES:
        return Object.assign({}, state, {
            isRequesting: false,
            error: action.data
        });
    case types.SUCCESS_GET_VOTE:
        return Object.assign({}, state, {
            items: state.items.map(v => {
                if (v.roll_id !== action.data.roll_id) return v;
                return Object.assign({}, v, {
                    results: action.data.body
                });
            })
        });
    default:
        return state;
    }
};

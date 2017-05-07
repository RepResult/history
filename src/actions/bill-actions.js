import fetch            from 'unfetch';
import * as types       from './action-types.js';
import { API_BILLS, PROXY }    from '../constants.js';

export const getBills = () => {
    return { type: types.GET_BILLS };
};

export const successGetBills = (data) => {
    return {
        type: types.SUCCESS_GET_BILLS,
        data
    };
};

export const errorGetBills = (data) => {
    return {
        type: types.ERROR_GET_BILLS,
        data
    };
};

export function doGetBills(page = 1, limit = 50) {
    return dispatch => {
        dispatch(getBills());
        const query = 'history.house_passage_result__exists=true&history.senate_passage_result__exists=true&order=last_action_at';
        const url = `${API_BILLS}?page=${page}&per_page=${limit}${query}`;
        return fetch(`${PROXY}${url}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Fetching bills');
            }
            return response.json();
        })
        .then(body => {
            dispatch(successGetBills(body.results));
        })
        .catch(error => {
            dispatch(errorGetBills({ message: error.toString() }));
        });
    };
}

import fetch            from 'unfetch';
import * as types       from './action-types.js';
import { API_LEGIS }    from '../constants.js';

export const getLegis = () => {
    return { type: types.GET_LEGIS };
};

export const successGetLegis = (data) => {
    return {
        type: types.SUCCESS_GET_LEGIS,
        data
    };
};

export const errorGetLegis = (data) => {
    return {
        type: types.ERROR_GET_LEGIS,
        data
    };
};

export function doGetLegis(page = 1, limit = 50) {
    return (dispatch, getState) => {
        dispatch(getLegis());
        const { citizen } = getState();
        const query = Math.abs(citizen.geo.lat)
            ? `&latitude=${citizen.geo.lat}&longitude=${citizen.geo.lon}`
            : `&zip=${citizen.zip}`;
        return fetch(`${API_LEGIS}?page=${page}${query}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Fetching legislators');
            }
            return response.json();
        })
        .then(body => {
            body.results.sort((a, b) => a.chamber > b.chamber ? -1 : 1);
            dispatch(successGetLegis(body.results));
        })
        .catch(error => {
            dispatch(errorGetLegis({ message: error.toString() }));
        });
    };
}

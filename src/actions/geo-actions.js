import fetch            from 'unfetch';
import * as types       from './action-types.js';
import { API_GEO }      from '../constants.js';

export const getGeo = (data) => {
    return {
        type: types.GET_CITIZEN_LOC,
        data
    };
};

export const successGetGeo = (data) => {
    return {
        type: types.SUCCESS_GET_CITIZEN_GEO,
        data
    };
};

export const errorGetGeo = (data) => {
    return {
        type: types.ERROR_GET_CITIZEN_LOC,
        data
    };
};

export function doGeocode(address) {
    return dispatch => {
        dispatch(getGeo(address));
        const url = (`${API_GEO}&address=${encodeURIComponent(address)}`);
        return fetch(`https://crossorigin.me/${url}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Fetching geocoder');
            }
            return response.text();
        })
        .then(body => JSON.parse(body).result)
        .then(body => {
            dispatch(successGetGeo({
                address,
                geo: {
                    lon: body.addressMatches[0].coordinates.x,
                    lat: body.addressMatches[0].coordinates.y
                }
            }));
        })
        .catch(error => {
            dispatch(errorGetGeo({ address, message: error.toString() }));
        });
    };
}

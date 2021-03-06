import fetch            from 'unfetch';
import * as xmlConvert  from 'xml-js';
import * as types       from './action-types.js';
import { API_VOTES, PROXY }    from '../constants.js';

export const getVotes = (data) => {
    return {
        type: types.GET_VOTES,
        data
    };
};

export const successGetVotes = (data) => {
    return {
        type: types.SUCCESS_GET_VOTES,
        data
    };
};

export const errorGetVotes = (data) => {
    return {
        type: types.ERROR_GET_VOTES,
        data
    };
};

export const getVote = (data) => {
    return {
        type: types.GET_VOTE,
        data
    };
};

export const successGetVote = (data) => {
    return {
        type: types.SUCCESS_GET_VOTE,
        data
    };
};

export const errorGetVote = (data) => {
    return {
        type: types.ERROR_GET_VOTE,
        data
    };
};

export function doGetVotes(page = 1, limit = 50) {
    return dispatch => {
        dispatch(getVotes());
        return fetch(`${API_VOTES}?page=${page}&per_page=${limit}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Fetching votes');
            }
            return response.json();
        })
        .then(body => {
            dispatch(successGetVotes(body.results));
            body.results.map((v, index) =>
                setTimeout(doGetVoteResult(v.roll_id, v.source), index * 200, dispatch));
        })
        .catch(error => {
            dispatch(errorGetVotes({ message: error.toString() }));
        });
    };
}

export function doGetVoteResult(roll_id, url) {
    return dispatch => {
        dispatch(getVote({ roll_id, url }));
        if (url.match(/senate/)) {
            url = url.replace('http://', 'https://');
        }
        return fetch(`${PROXY}${url}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Fetching vote result');
            }
            return response.text();
        })
        .then(resp => {
            return xmlConvert.xml2json(resp, { compact: true });
        })
        .then(body => {
            return JSON.parse(body);
        })
        .then(body => {
            dispatch(successGetVote({ roll_id, url, body }));
        })
        .catch(error => {
            dispatch(errorGetVote({ roll_id, url, message: error.toString() }));
        });
    };
}

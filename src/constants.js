export const ENV = window.location.hostname.match(/localhost|staging/)
    ? 'STAG' : 'PROD';
if (ENV.match(/STAG/)) {
    window.DEBUG = true;
} else if (!location.protocol.match(/https/)) {
    location.href = 'https:' + location.href.substring(location.protocol.length);
}

export const API_ROOT  = 'https://congress.api.sunlightfoundation.com';
export const API_BILLS = API_ROOT + '/bills';
export const API_LEGIS = API_ROOT + '/legislators/locate';

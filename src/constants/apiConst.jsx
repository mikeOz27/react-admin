const getBaseUrl = () => {
    const API_URL_DEVELOMPMENT = import.meta.env.VITE_API_URL_DEVELOMPMENT
    const API_URL_PRODUCTION = import.meta.env.VITE_API_URL_PRODUCTION
    const urls = {
        development: API_URL_DEVELOMPMENT,
        production: API_URL_PRODUCTION,
    };
    return urls.development || urls.production
};
const BASE_URL = getBaseUrl() + '/api/auth';
const environment = {
    /** ********* AUTH ***********/
    ME: '/me',
    RefreshToken: '/refresh',
    LOGIN: '/login',
};

export default { BASE_URL, environment };
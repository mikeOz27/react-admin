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
    REGISTER: '/register',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    /** ********* USERS ***********/
    USERS: '/users',
    COUNT_USERS: '/users/count_users',
    ACTIVATE_USER: 'users/activate_user',
    DESACTIVATE_USER: 'users/desactivate_user',
    REGISTER_USER: '/users/register_user',
    UPDATE_USER: '/users/update_user/',
    DELETE_USER: '/users/delete_user/',
};

export default { BASE_URL, environment };

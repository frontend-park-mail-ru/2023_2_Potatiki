import {AppDispatcher} from '../modules/dispatcher';

export const UserActionsType = {
    CHECK_SESSION: 'CHECK_SESSION',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    VALIDATE_LOGIN: 'VALIDATE_LOGIN',
    VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
    VALIDATE_REPEAT_PASSWORD: 'VALIDATE_REPEAT_PASSWORD',
    REMOVE_LISTENERS: 'REMOVE_LISTENERS',
    VALIDATE_PHONE: 'VALIDATE_PHONE',
    CHECK_AUTH: 'CHECK_AUTH',
    GET_PROFILE_DATA: 'GET_PROFILE_DATA',
    GET_CSRF_TOKEN: 'GET_CSRF_TOKEN',
    GET_CURRENT_ADDRESS: 'GET_CURRENT_ADDRESS',
    GET_ADDRESSES: 'GET_ADDRESSES',
    UPDATE_NUMBER: 'UPDATE_NUMBER',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    ADD_ADDRESS: 'ADD_ADDRESS',
    UPDATE_ADDRESS: 'UPDATE_ADDRESS',
    DELETE_ADDRESS: 'DELETE_ADDRESS',
    MAKE_CURRENT_ADDRESS: 'MAKE_CURRENT_ADDRESS',
    UPDATE_IMG: 'UPDATE_IMG',
};

export const UserActions = {
    checkSession() {
        AppDispatcher.dispatch({
            type: UserActionsType.CHECK_SESSION,
            payload: {},
        });
    },

    login(login, password) {
        AppDispatcher.dispatch({
            type: UserActionsType.LOGIN,
            payload: {
                login: login,
                password: password,
            },
        });
    },

    validateLogin(login) {
        AppDispatcher.dispatch({
            type: UserActionsType.VALIDATE_LOGIN,
            payload: {
                login: login,
            },
        });
    },

    validatePassword(password) {
        AppDispatcher.dispatch({
            type: UserActionsType.VALIDATE_PASSWORD,
            payload: {
                password: password,
            },
        });
    },

    validateRepeatPassword(password, repeatPassword) {
        AppDispatcher.dispatch({
            type: UserActionsType.VALIDATE_REPEAT_PASSWORD,
            payload: {
                password: password,
                repeatPassword: repeatPassword,
            },
        });
    },

    signup(login, password, repeatPassword, phone) {
        AppDispatcher.dispatch({
            type: UserActionsType.SIGNUP,
            payload: {
                login: login,
                password: password,
                repeatPassword: repeatPassword,
                phone,
            },
        });
    },

    logout() {
        AppDispatcher.dispatch({
            type: UserActionsType.LOGOUT,
            payload: {},
        });
    },

    removeListeners() {
        AppDispatcher.dispatch({
            type: UserActionsType.REMOVE_LISTENERS,
        });
    },

    validatePhone(phone) {
        AppDispatcher.dispatch({
            type: UserActionsType.VALIDATE_PHONE,
            payload: {phone},
        });
    },

    checkAuth() {
        AppDispatcher.dispatch({
            type: UserActionsType.CHECK_AUTH,
        });
    },

    getProfileData() {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_PROFILE_DATA,
        });
    },

    getCSRFToken(page) {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_CSRF_TOKEN,
            payload: {page},
        });
    },

    getCurrentAddress() {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_CURRENT_ADDRESS,
        });
    },

    getAddresses() {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_ADDRESSES,
            payload: {},
        });
    },

    updateNumber(number) {
        AppDispatcher.dispatch({
            type: UserActionsType.UPDATE_NUMBER,
            payload: {
                number: number,
            },
        });
    },

    updatePassword(oldPassword, newPassword, repeatPassword) {
        AppDispatcher.dispatch({
            type: UserActionsType.UPDATE_PASSWORD,
            payload: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                repeatPassword: repeatPassword,
            },
        });
    },

    addAddress(city, street, house, flat) {
        AppDispatcher.dispatch({
            type: UserActionsType.ADD_ADDRESS,
            payload: {
                city: city,
                street: street,
                house: house,
                flat: flat,
            },
        });
    },

    updateAddress(id, addressIsCurrent, city, street, house, flat) {
        AppDispatcher.dispatch({
            type: UserActionsType.UPDATE_ADDRESS,
            payload: {
                id,
                addressIsCurrent,
                city: city,
                street: street,
                house: house,
                flat: flat,
            },
        });
    },

    deleteAddress(id) {
        AppDispatcher.dispatch({
            type: UserActionsType.DELETE_ADDRESS,
            payload: {
                id,
            },
        });
    },

    makeCurrentAddress(id) {
        AppDispatcher.dispatch({
            type: UserActionsType.MAKE_CURRENT_ADDRESS,
            payload: {
                id,
            },
        });
    },

    updateImg(img) {
        AppDispatcher.dispatch({
            type: UserActionsType.UPDATE_IMG,
            payload: {
                img,
            },
        });
    },
};

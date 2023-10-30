import {AppDispatcher} from '../modules/dispatcher';

export const UserActionsType = {
    CHECK_SESSION: 'CHECK_SESSION',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    VALIDATE_LOGIN: 'VALIDATE_LOGIN',
    VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
    VALIDATE_REPEAT_PASSWORD: 'VALIDATE_REPEAT_PASSWORD',
};

export const UserActions = {
    checkSession() {
        AppDispatcher.dispatch({
            type: UserActionsType.CHECK_SESSION,
            payload: {},
        });
    },

    login(login, password) {
        console.log('dispatch');
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

    validateRepeatPassword(password, reapeatPassword) {
        AppDispatcher.dispatch({
            type: UserActionsType.VALIDATE_REPEAT_PASSWORD,
            payload: {
                password: password,
                reapeatPassword: reapeatPassword,
            },
        });
    },

    signup(login, password, repeatPassword) {
        AppDispatcher.dispatch({
            type: UserActionsType.SIGNUP,
            payload: {
                login: login,
                password: password,
                repeatPassword: repeatPassword,
            },
        });
    },

    logout() {
        AppDispatcher.dispatch({
            type: UserActionsType.LOGOUT,
            payload: {},
        });
    },
};

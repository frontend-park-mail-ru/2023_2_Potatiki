import {AppDispatcher} from '../modules/dispatcher';

export const UserActionsType = {
    CHECK_SESSION: 'CHECK_SESSION',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    VALIDATE_LOGIN: 'VALIDATE_LOGIN',
    VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
    VALIDATE_REPEAT_PASSWORD: 'VALIDATE_REPEAT_PASSWORD',
    GET_CART_PRODUCTS: 'GET_CART_PRODUCTS',
    GET_PRODUCTS: 'GET_PRODUCTS',
    ADD_CART_BUTTON: 'ADD_CART_BUTTON',
    ADD_PRODUCT_LOCAL: 'ADD_PRODUCT_LOCAL',
    CHANGE_PRODUCT_COUNT_LOCAL: 'CHANGE_PRODUCT_COUNT_LOCAL',
    GET_CART_COUNT: 'GET_CART_COUNT',
    REMOVE_LISTENERS: 'REMOVE_LISTENERS',
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

    getCartProducts() {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_CART_PRODUCTS,
            payload: {},
        });
    },

    getProducts(offset = 0, count = 5, config) {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_PRODUCTS,
            payload: {offset, count, config},
        });
    },

    addCartButton(id) {
        AppDispatcher.dispatch({
            type: UserActionsType.ADD_CART_BUTTON,
            payload: {id},
        });
    },

    addProductLocal(data) {
        AppDispatcher.dispatch({
            type: UserActionsType.ADD_PRODUCT_LOCAL,
            payload: {data},
        });
    },

    changeQuantityLocal(data, isDecrease) {
        AppDispatcher.dispatch({
            type: UserActionsType.CHANGE_PRODUCT_COUNT_LOCAL,
            payload: {data, isDecrease},
        });
    },

    getCartCount() {
        AppDispatcher.dispatch({
            type: UserActionsType.GET_CART_COUNT,
        });
    },

    removeListeners() {
        AppDispatcher.dispatch({
            type: UserActionsType.REMOVE_LISTENERS,
        });
    },
};

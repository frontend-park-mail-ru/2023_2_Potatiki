import {AppDispatcher} from '../modules/dispatcher';

export const CartActionsType = {
    GET_CART_PRODUCTS: 'GET_CART_PRODUCTS',
    ADD_PRODUCT_LOCAL: 'ADD_PRODUCT_LOCAL',
    DEL_PRODUCT: 'DEL_PRODUCT',
    CHANGE_PRODUCT_COUNT_LOCAL: 'CHANGE_PRODUCT_COUNT_LOCAL',
    GET_CART_COUNT: 'GET_CART_COUNT',
    UPDATE_ORDER: 'UPDATE_ORDER',
};

export const CartActions = {

    getCartProducts() {
        AppDispatcher.dispatch({
            type: CartActionsType.GET_CART_PRODUCTS,
            payload: {},
        });
    },

    addProductLocal(data) {
        AppDispatcher.dispatch({
            type: CartActionsType.ADD_PRODUCT_LOCAL,
            payload: {data},
        });
    },

    changeQuantityLocal(data, isDecrease) {
        AppDispatcher.dispatch({
            type: CartActionsType.CHANGE_PRODUCT_COUNT_LOCAL,
            payload: {data, isDecrease},
        });
    },

    getCartCount() {
        AppDispatcher.dispatch({
            type: CartActionsType.GET_CART_COUNT,
        });
    },

    deleteProductFromCart(data) {
        AppDispatcher.dispatch({
            type: CartActionsType.DEL_PRODUCT,
            payload: {data},
        });
    },

    updateOrder(page) {
        AppDispatcher.dispatch({
            type: CartActionsType.UPDATE_ORDER,
            payload: {page},
        });
    },
};

import {AppDispatcher} from '../modules/dispatcher';

export const ProductsActionsType = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_CATEGORY_PRODUCTS: 'GET_CATEGORY_PRODUCTS',
    GET_CATEGORY_NAME: 'GET_CATEGORY_NAME',
    GET_PRODUCT: 'GET_PRODUCT',
};

export const ProductsActions = {

    getCategories() {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_CATEGORIES,
        });
    },

    getProducts(offset = 0, count = 5, config) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_PRODUCTS,
            payload: {offset, count, config},
        });
    },

    getCategoryProducts(offset = 0, count = 5, categoryId) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_CATEGORY_PRODUCTS,
            payload: {offset, count, categoryId},
        });
    },

    getCategoryName(id) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_CATEGORY_NAME,
            payload: {id},
        });
    },

    getProduct(id) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_PRODUCT,
            payload: {id},
        });
    },
};

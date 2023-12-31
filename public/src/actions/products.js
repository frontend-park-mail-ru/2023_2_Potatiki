import {AppDispatcher} from '../modules/dispatcher';

export const ProductsActionsType = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_CATEGORY_PRODUCTS: 'GET_CATEGORY_PRODUCTS',
    GET_CATEGORY_NAME: 'GET_CATEGORY_NAME',
    GET_PRODUCT: 'GET_PRODUCT',
    GET_SUGGEST: 'GET_SUGGEST',
    GET_SEARCH_PRODUCTS: 'GET_SEARCH_PRODUCTS',
    GET_REVIEWS: 'GET_REVIEWS',
    GET_REVIEW_FORM: 'GET_REVIEW_FORM',
    GET_REVIEWS_SUMMARY: 'GET_REVIEWS_SUMMARY',
    VALIDATE_REVIEW_INPUT: 'VALIDATE_REVIEW_INPUT',
    CREATE_REVIEW: 'CREATE_REVIEW',
    ON_SCROLL: 'ON_SCROLL',
    GET_REC_PRODUCTS: 'GET_REC_PRODUCTS',
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

    getCategoryProducts(offset = 0, count = 5, categoryId, sortType) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_CATEGORY_PRODUCTS,
            payload: {offset, count, categoryId, sortType},
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

    getSuggest(word) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_SUGGEST,
            payload: {word},
        });
    },

    getSearchProducts(searchValue) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_SEARCH_PRODUCTS,
            payload: {searchValue},
        });
    },

    getReviews(id) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_REVIEWS,
            payload: {id},
        });
    },

    getReviewForm(id) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_REVIEW_FORM,
            payload: {id},
        });
    },

    getReviewsSummary(id) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_REVIEWS_SUMMARY,
            payload: {id},
        });
    },

    validateReviewInput(data, inputName) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.VALIDATE_REVIEW_INPUT,
            payload: {data, inputName},
        });
    },

    createReview(productId, pros, cons, comment, rating) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.CREATE_REVIEW,
            payload: {productId, pros, cons, comment, rating},
        });
    },

    onScroll() {
        AppDispatcher.dispatch({
            type: ProductsActionsType.ON_SCROLL,
        });
    },

    getRecProducts(productId, categoryId) {
        AppDispatcher.dispatch({
            type: ProductsActionsType.GET_REC_PRODUCTS,
            payload: {productId, categoryId},
        });
    },
};

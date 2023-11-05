import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';

import {Events} from '../config/events';
import renderServerMessage from '../modules/server-message';
import router from '../modules/router';
import {ProductsActionsType} from '../actions/products';
import {categoryProductsUrl, getAllCategoriesUrl, getProductUrl, getProductsUrl} from '../config/urls';
import {reviver} from '../modules/utils';

/**
 * Класс
 */
class ProductsStore {
    #state = {
        categories: undefined,
        categoriesTree: undefined,
    };

    /**
     *
     */
    constructor() {
        this.registerEvents();
    }

    /**
     *
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case ProductsActionsType.GET_CATEGORIES:
                this.getCategories();
                break;
            case ProductsActionsType.GET_PRODUCTS:
                this.getProducts(
                    action.payload.offset,
                    action.payload.count,
                    action.payload.config,
                );
                break;
            case ProductsActionsType.GET_CATEGORY_PRODUCTS:
                this.getProductsByCategory(
                    action.payload.offset,
                    action.payload.count,
                    action.payload.categoryId,
                );
                break;
            case ProductsActionsType.GET_CATEGORY_NAME:
                this.getCategoryName(action.payload.id);
                break;
            case ProductsActionsType.GET_PRODUCT:
                this.getProduct(action.payload.id);
                break;
            default:
                break;
            }
        });
    }

    /**
   * Получение и отрисовка карусели товаров
   * @param {Number} offset Сдвиг в списке товаров
   * @param {Number} count Количество запрашиваемых товаров
   * @param {Object} config Конфиг карусели
   */
    getProducts(offset, count, config) {
        Ajax.prototype
            .getRequest(`${getProductsUrl}?paging=${offset}&count=${count}`)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    const products = this.isProductInCart(body);
                    eventEmmiter.emit(Events.PRODUCTS, products, config);
                    break;
                case 429:
                    renderServerMessage('Возникла ошибка при получении товаров');
                    break;
                default:
                    break;
                }
            });
    }

    isProductInCart(products) {
        if (!products) {
            return products;
        }
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        if (!productsMap) {
            return products;
        }
        products.forEach((product) => {
            if (!productsMap) {
                product.quantity = 0;
            } else {
                const data = productsMap.get(product.productId);
                if (data) {
                    product.quantity = data.quantity;
                } else {
                    product.quantity = 0;
                }
            }
        });
        return products;
    }

    async getCategoryName(categoryId) {
        categoryId = parseInt(categoryId);
        const category = this.#state.categories?.get(categoryId);
        if (!category) {
            const promise = this.getCategories();
            promise.then(() => {
                const newCategory = this.#state.categories.get(categoryId);
                if (!newCategory) {
                    eventEmmiter.emit(Events.NOT_FOUND);
                    return;
                }
                eventEmmiter.emit(Events.CATEGORY_NAME, newCategory.categoryName);
            });
            return;
        }
        eventEmmiter.emit(Events.CATEGORY_NAME, category.categoryName);
    }

    async getProduct(id) {
        const [statusCode, body] = await Ajax.prototype.getRequest(`${getProductUrl}${id}`);
        switch (statusCode) {
        case 200:
            const product = this.isProductInCart([body])[0];
            eventEmmiter.emit(Events.PRODUCT, product);
            break;
        case 400:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            renderServerMessage('Возникла ошибка при получении товара');
            break;
        default:
            break;
        }
    }

    getCategories() {
        return Ajax.prototype.getRequest(getAllCategoriesUrl).then((result) => {
            const [statusCode, body] = result;
            console.log(statusCode, body);
            switch (statusCode) {
            case 200:
                const lvl1 = new Map();
                const lvl2 = new Map();
                const lvl3 = new Map();
                this.#state.categories = new Map();
                body.forEach((parent) => {
                    if (parent.categoryParent === -1) {
                        lvl1.set(parent.categoryId, parent);
                    }
                    console.log('id', parent.categoryId);
                    this.#state.categories.set(parent.categoryId, parent);
                    console.log('item', this.#state.categories.get(parent.categoryId));
                });
                body.forEach((middle) => {
                    if (lvl1.has(middle.categoryParent)) {
                        lvl2.set(middle.categoryId, middle);
                    }
                });
                body.forEach((leaf) => {
                    if (lvl2.has(leaf.categoryParent)) {
                        lvl3.set(leaf.categoryId, leaf);
                    }
                });
                console.log(lvl1, lvl2, lvl3);
                const categories = new Array();

                lvl1.forEach((parent) => {
                    parent.childs = new Array();
                    lvl2.forEach((middle) => {
                        if (middle.categoryParent === parent.categoryId) {
                            middle.childs = new Array();
                            console.log(middle);
                            lvl3.forEach((leaf) => {
                                if (leaf.categoryParent === middle.categoryId) {
                                    console.log(leaf);
                                    middle.childs.push(leaf);
                                }
                            });
                            parent.childs.push(middle);
                        }
                    });
                    categories.push(parent);
                });
                console.log(categories);
                eventEmmiter.emit(Events.CATEGORIES, categories);
                // eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
                break;
            case 429:
                renderServerMessage('Возникла ошибка при получении категорий');
                break;
            default:
                break;
            };
        });
    }

    async getProductsByCategory(paging=0, count=5, categoryId) {
        const [statusCode, body] = await Ajax.prototype.getRequest(`${categoryProductsUrl}?paging=${paging}&count=${count}&category_id=${categoryId}`);
        switch (statusCode) {
        case 200:
            const products = this.isProductInCart(body);
            eventEmmiter.emit(Events.CATEGORY_PRODUCTS, products);
            break;
        case 400:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            renderServerMessage('Возникла ошибка при получении товаров');
            break;
        default:
            break;
        }
    }
}

export const productsStore = new ProductsStore();

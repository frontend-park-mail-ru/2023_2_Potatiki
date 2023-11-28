import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {Events} from '../config/events';
import {ProductsActionsType} from '../actions/products';
import {categoryProductsUrl,
    getAllCategoriesUrl, getProductUrl, getProductsUrl} from '../config/urls';
import {parseCategories, reviver} from '../modules/utils';

/**
 * Класс хранилище для товаров
 */
class ProductsStore {
    #state = {
        categories: undefined,
        categoriesTree: undefined,
    };

    /**
     * Конструктор для класса
     */
    constructor() {
        this.registerEvents();
        this.getCategories();
    }

    /**
     * Регистрация функций для обработки событий
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
            case ProductsActionsType.GET_SUGGEST:
                this.getSuggest(action.payload.word);
                break;
            case ProductsActionsType.GET_SEARCH_PRODUCTS:
                this.getSearchProducts(action.payload.searchValue);
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
                    eventEmmiter.emit(Events.SERVER_MESSAGE,
                        'Возникла ошибка при получении товаров');
                    break;
                default:
                    break;
                }
            });
    }

    /**
     * Проверка наличия товаров в корзине и добавление поля количества в корзине к ним, если есть
     * @param {Array} products Проверяеиые товары
     * @return {Array} Товары с полем количества
     */
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

    /**
     * Взятие названия категории по  Id
     * @param {String} categoryId Id категории
     */
    async getCategoryName(categoryId) {
        categoryId = parseInt(categoryId);
        const category = this.#state.categories?.get(categoryId);
        if (!category) {
            const promise = this.getCategories();
            promise.then(() => {
                const newCategory = this.#state.categories?.get(categoryId);
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

    /**
     * Взятие товара по id
     * @param {String} id Id товара
     */
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении товара');
            break;
        default:
            break;
        }
    }

    /**
     * Получение категорий
     * @return {Promise} Результат запроса
     */
    getCategories() {
        return Ajax.prototype.getRequest(getAllCategoriesUrl).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                const [categories, categoriesMap] = parseCategories(body);
                this.#state.categories = categoriesMap;
                eventEmmiter.emit(Events.CATEGORIES, categories);
                break;
            case 429:
                eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении категорий');
                break;
            default:
                break;
            };
        });
    }

    /**
     * Взятие товаров по категории
     * @param {Number} paging Отступ
     * @param {Number} count Количество товаров
     * @param {Number} categoryId Idкатегории
     */
    async getProductsByCategory(paging=0, count=5, categoryId) {
        const requestUrl =
            `${categoryProductsUrl}?paging=${paging}&count=${count}&category_id=${categoryId}`;
        const [statusCode, body] = await Ajax.prototype.getRequest(requestUrl);
        switch (statusCode) {
        case 200:
            const products = this.isProductInCart(body);
            eventEmmiter.emit(Events.CATEGORY_PRODUCTS, products);
            break;
        case 400:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            eventEmmiter.emit(Events.CATEGORY_PRODUCTS);
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении товаров');
            break;
        default:
            break;
        }
    }

    /**
     * Взятие саджеста
     * @param {*} word Поисковый запрос
     */
    async getSuggest(word) {
        if (!word) {
            eventEmmiter.emit(Events.RECIEVE_SUGGEST, this.getLastSearchRequests());
            return;
        }

        let maxSuggestLen = 10;

        let rows = [];
        let matchCategories = [];
        let matchProducts = [];

        this.#state.categories.forEach((el) => {
            if (el.categoryName.toLowerCase().startsWith(word)) {
                matchCategories.push({name: el.categoryName, isCategory: true, id: el.categoryId});
                maxSuggestLen--;
            }
        });

        const requestUrl =
            `search/?product=${word}`;
        const [statusCode, body] = await Ajax.prototype.getRequest(requestUrl);

        switch (statusCode) {
        case 200:
            const products = body;

            if (!products) {
                return;
            }

            products.forEach((el) => {
                if (maxSuggestLen > 0) {
                    matchProducts.push({name: el.productName.toLowerCase(), isCategory: false,
                        id: el.productId});
                    maxSuggestLen--;
                }
            });

            rows = [...matchProducts, ...matchCategories];

            if (rows.length === 0) {
                eventEmmiter.emit(Events.RECIEVE_SUGGEST, this.getLastSearchRequests());
                return;
            }

            eventEmmiter.emit(Events.RECIEVE_SUGGEST, rows);
            break;
        case 400:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            eventEmmiter.emit(Events.RECIEVE_SUGGEST, this.getLastSearchRequests());
            break;
        default:
            break;
        }
    }

    /**
     * Взятие продуктов по запросу
     * @param {String} searchValue Запрос
     */
    async getSearchProducts(searchValue) {
        const requestUrl =
            `search/?product=${searchValue}`;
        const [statusCode, body] = await Ajax.prototype.getRequest(requestUrl);
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.SUCCESSFUL_GET_SEARCH_PRODUCTS, body);
            // this.addRequestLocal(searchValue);
            break;
        case 400:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении товаров');
            break;
        default:
            break;
        }
    }

    /**
     * Взятие последних десяти поисковых запросов
     * @return {Array} Массив запросов
     */
    getLastSearchRequests() {
        const requests = JSON.parse(localStorage.getItem('searchRequests'));
        if (requests) {
            return requests.reverse();
        }
        return [];
    }

    /**
     * Добавление запроса поиска локально
     * @param {String} searchValue Добовляемое значение
     */
    addRequestLocal(searchValue) {
        const requests = JSON.parse(localStorage.getItem('searchRequests'));
        if (!searchValue) {
            return;
        }
        if (requests) {
            requests.push(searchValue);
            if (requests.length > 10) {
                requests.shift();
            }
            localStorage.setItem('searchRequests', JSON.stringify(requests));
        } else {
            localStorage.setItem('searchRequests', JSON.stringify([searchValue]));
        }
    }
}

export const productsStore = new ProductsStore();

import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {Events} from '../config/events';
import {ProductsActionsType} from '../actions/products';
import {categoryProductsUrl,
    createReviewUrl,
    getAllCategoriesUrl, getProductUrl, getProductsUrl, getReviewsUrl} from '../config/urls';
import {parseCategories, reduceReviews, reviver} from '../modules/utils';
import {userStore} from './user';
import {checkReviewInput} from '../modules/validation';
import { SORT_POPULAR, SORT_PRICE_ASC, SORT_PRICE_DESC } from '../config/components';
import {advantagesName, commentsName, disadvantagesName} from '../config/components';

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
                    action.payload.sortType,
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
            case ProductsActionsType.GET_REVIEWS:
                this.getReviews(action.payload.id);
                break;
            case ProductsActionsType.GET_REVIEW_FORM:
                this.getReviewForm(action.payload.id);
                break;
            case ProductsActionsType.VALIDATE_REVIEW_INPUT:
                this.validateReviewInput(action.payload.data, action.payload.inputName);
                break;
            case ProductsActionsType.CREATE_REVIEW:
                this.createReview(
                    action.payload.productId,
                    action.payload.pros,
                    action.payload.cons,
                    action.payload.comment,
                    action.payload.rating,
                );
                break;
            case ProductsActionsType.ON_SCROLL:
                this.onScroll();
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
    async getProductsByCategory(paging=0, count=5, categoryId, sortType) {
        let sortQuery = '';

        switch (sortType) {
        case SORT_PRICE_ASC:
            sortQuery = '&priceBy=ASC';
            break;
        case SORT_PRICE_DESC:
            sortQuery = '&priceBy=DESC';
            break;
        case SORT_RATING:
            sortQuery = '&ratingBy=DESC';
            break;
        }

        const requestUrl =
            `${categoryProductsUrl}?paging=${paging}&count=${count}&category_id=${categoryId}` +
            sortQuery;
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
     * Получение отзывов о товаре
     * @param {String} id id товара
     */
    async getReviews(id) {
        const [statusCode, body] = await Ajax.prototype.getRequest(
            `${getReviewsUrl}?product=${id}`,
        );
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.REVIEWS, body);
            eventEmmiter.emit(Events.REVIEWS_SUMMARY, reduceReviews(body));
            break;
        case 400:
        case 429:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка');
            break;
        }
    }

    /**
     * Получение информации о рейтинге
     * @param {String} id id товара
     */
    async getReviewsSummary(id) {
        const [statusCode, body] = await Ajax.prototype.getRequest(
            `${getReviewsUrl}?product=${id}`,
        );
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.REVIEWS_SUMMARY, reduceReviews(body));
            break;
        case 400:
        case 429:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка');
            break;
        }
    }

    /**
     * Получение формы отзыва
     */
    getReviewForm() {
        if (!userStore.isAuth) {
            return;
        }
        eventEmmiter.emit(Events.REVIEW_FORM);
        eventEmmiter.emit(Events.OFF_PAGE_SCROLL);
    }

    /**
     * Создание отзыва
     * @param {String} productId id товара
     * @param {String} pros достоинства
     * @param {String} cons недостатки
     * @param {String} comment комментарий
     * @param {Number} rating рейтинг
     */
    async createReview(productId, pros, cons, comment, rating) {
        const isValidPros = this.validateReviewInput(pros, advantagesName);
        const isValidCons = this.validateReviewInput(cons, disadvantagesName);
        const isValidComment = this.validateReviewInput(comment, commentsName);

        if (!(isValidPros && isValidCons && isValidComment)) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(
            createReviewUrl,
            {productId, pros, cons, comment, rating},
            userStore.csrfToken,
        );

        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.ON_PAGE_SCROLL);
            eventEmmiter.emit(
                Events.SUCCESSFUL_REVIEW,
                body,
            );
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ваш отзыв опубликован', true);
            this.getReviewsSummary(productId);
            break;
        case 401:
        case 406:
        case 429:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка');
            break;
        case 413:
            eventEmmiter.emit(Events.ON_PAGE_SCROLL);
            eventEmmiter.emit(
                Events.REVIEW_EXIST,
                body,
            );
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Вы уже оставляли отзыв на этот товар');
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
            eventEmmiter.emit(Events.SUCCESSFUL_GET_SEARCH_PRODUCTS, body, searchValue);
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

    /**
     * Валидация поля формы отзыва
     * @param {String} data
     * @param {String} inputName
     * @return {Boolean} проверка на валидацию
     */
    validateReviewInput(data, inputName) {
        const [error, isValid] = checkReviewInput(data);
        if (!isValid) {
            eventEmmiter.emit(Events.REVIEW_INPUT_ERROR, error, inputName);
            return false;
        }
        eventEmmiter.emit(Events.REVIEW_INPUT_OK, inputName);
        return true;
    }

    /**
     * Возвращение скролла на страницу
     */
    onScroll() {
        eventEmmiter.emit(Events.ON_PAGE_SCROLL);
    }
}

export const productsStore = new ProductsStore();

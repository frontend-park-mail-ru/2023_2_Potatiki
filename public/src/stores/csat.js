import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {Events} from '../config/events';
import {ProductsActionsType} from '../actions/products';
import {categoryProductsUrl,
    getAllCategoriesUrl, getProductUrl, getProductsUrl} from '../config/urls';
import {parseCategories, reviver} from '../modules/utils';
import {CsatActionsType} from '../actions/csat';

/**
 * Класс хранилище для товаров
 */
class CsatStore {
    #state = {
        categories: undefined,
        categoriesTree: undefined,
    };

    /**
     * Конструктор для класса
     */
    constructor() {
        this.registerEvents();
    }

    /**
     * Регистрация функций для обработки событий
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case CsatActionsType.CLOSE_IFRAME:
                this.closeIframe();
                break;
            default:
                break;
            }
        });
    }

    closeIframe() {
        eventEmmiter.emit(Events.CLOSE_IFRAME);
    }
}

export const csatStore = new CsatStore();

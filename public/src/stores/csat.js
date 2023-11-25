import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {Events} from '../config/events';
import {ProductsActionsType} from '../actions/products';
import {baseUrl, categoryProductsUrl,
    getAllCategoriesUrl, getProductUrl, getProductsUrl, getQuestionsUrl, myDomen, parentDomen} from '../config/urls';
import {parseCategories, reviver} from '../modules/utils';
import {userStore} from './user';
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
            case CsatActionsType.REMOVE_SELF:
                this.removeSelf();
                break;
            case CsatActionsType.GET_QUESTIONS:
                this.getQuestions();
                break;
            case CsatActionsType.SEND_ANSWER:
                this.sendAnswer(
                    action.payload.questionID,
                    action.payload.resultID,
                    action.payload.answer,
                );
                break;
            default:
                break;
            }
        });
    }

    removeSelf() {
        console.log('csat store');
        // const win = window.frames.csat;
        window.top.postMessage('сообщение', '*');
        document.body.style.display = 'none';
    }

    async getQuestions() {
        const [status, body] = await Ajax.prototype.getRequest(getQuestionsUrl);
        eventEmmiter.emit(Events.QUESTIONS, body);
    }

    async sendAnswer(questionID, resultID, answer) {
        const [status, body] = await Ajax.prototype.postRequest('survey/response', {questionID, resultID, answer});
        // eventEmmiter.emit(Events.QUESTIONS, body);
    }
}

export const csatStore = new CsatStore();

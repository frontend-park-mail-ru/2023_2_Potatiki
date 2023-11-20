import './signup-page.scss';
import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import template from './signup-page.hbs';
import {config} from '../../../config.js';
import {signupRoute} from '../../config/urls.js';
import {UserActions} from '../../actions/user.js';

/**
 * Класс страницы регистрации
 */
export default class SignupPage {
    #parent;
    #config;

    signupForm;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.signupPage;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.getElementById('signup-page');
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.signupForm.removeListeners();
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        this.signupForm.unsubscribeToEvents();
    }

    /**
   * Отрисовка страницы
   */
    render() {
        UserActions.getCSRFToken(signupRoute);

        this.#parent.innerHTML = template();
        document.getElementById('container-header').innerHTML = '';


        const logo = new Link(this.self, this.#config.logo);
        logo.render();

        this.signupForm = new SignupForm(
            this.self,
        );

        this.signupForm.render();
    }
}

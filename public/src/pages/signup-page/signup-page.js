import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import {checkLogin, checkPassword} from '../../modules/validation.js';
import '../templates.js';

/**
 * Класс страницы регистрации
 */
export default class SignupPage {
    #parent;

    #config;

    #router;

    signupForm;
    isValidForm = false;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.querySelector('#signup-page');
    }

    /**
   * Обработка формы регистрации
   * @param {Event} event Событие отправки формы
   */
    formListener(event) {
        event.preventDefault();
        const form = document.forms['signup-form'];
        const login = form.elements.login.value;
        const password = form.elements.password.value;
        const repeatPassword = this.signupForm.reapeatPassword.value;

        let err = this.validateLogin(login);
        if (err) {
            this.signupForm.login.renderError(err);
            return;
        }

        err = this.validatePassword(password);
        if (err) {
            this.signupForm.password.renderError(err);
            return;
        }

        if (password !== repeatPassword) {
            this.signupForm.reapeatPassword.renderError('Пароли не совпадают');
            return;
        }

        if (this.isValidForm) {
            Ajax.prototype.postRequest(
                'auth/signup',
                {'login': login, 'password': password}).then((result) => {
                const [statusCode, body] = result;
                this.signupForm.removeError();
                switch (statusCode) {
                case 200:
                    this.#router('main', true);
                    break;
                case 400:
                    this.signupForm.renderError('Такой логин уже существует');
                    break;
                case 429:
                    renderServerError(body);
                    break;
                default:
                    break;
                }
            });
        }
    }

    /**
     * Валидация логина
     * @param {String} login Логин пользователя
     * @return {String} Описание ошибки
     */
    validateLogin(login) {
        const [message, isValid] = checkLogin(login);
        this.isValidForm = isValid;
        return message;
    }

    /**
     * Валидация пароля
     * @param {String} password Пароль пользователя
     * @return {String} Описание ошибки
     */
    validatePassword(password) {
        const [message, isValid] = checkPassword(password);
        this.isValidForm = isValid;
        return message;
    }

    /**
     * Проверка идентичности паролей
     * @param {String} pass Пароль пользователя
     * @return {String} Сообщение об ошибке
     */
    checkEqualityPassword(pass) {
        return function(reapeatPass) {
            if (pass.value !== reapeatPass) {
                this.isValidForm = false;
                return 'Пароли не совпадают';
            }
            this.isValidForm = true;
            return '';
        };
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.signupForm.removeListeners();
    }

    /**
   * Отрисовка страницы
   */
    render() {
        this.#parent.innerHTML = window.Handlebars.templates['signup-page.hbs']();

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        this.signupForm = new SignupForm(
            this.self,
            this.#config.signupPage.form,
            this.formListener.bind(this),
        );

        this.signupForm.render();

        this.signupForm.login.addFocusOutListener(this.validateLogin.bind(this));
        this.signupForm.login.addFocusInListener();

        this.signupForm.password.addFocusOutListener(this.validatePassword.bind(this));
        this.signupForm.password.addFocusInListener();

        this.signupForm.reapeatPassword.addFocusOutListener(
            this.checkEqualityPassword(this.signupForm.password).bind(this),
        );
        this.signupForm.reapeatPassword.addFocusInListener();
    }
}

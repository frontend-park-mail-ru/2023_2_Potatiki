import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 * Класс формы регистрации
 */
export default class SignupForm {
    #parent;
    #config;
    #submitHandle;
    login;
    password;
    repeatPassword;
    submit;

    /**
     * Конструктор
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки
     * @param {Function} submitHandle Функция вызываемая при отправке формы
     */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }

    /**
     * Отрисовка ошибки в форме
     * @param {String} error Текст ошибки
     */
    renderError(error) {
        const errorDiv = document.getElementById(this.#config.errorId);
        errorDiv.textContent = error;
    }

    /**
     * Удаление ошибки с формы
     */
    removeError() {
        const errorDiv = document.getElementById(this.#config.errorId);
        errorDiv.textContent = '';
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.login.removeListeners();
        this.password.removeListeners();
        this.reapeatPassword.removeListeners();
        this.submit.removeListeners();
    }


    /**
     * Валидация логина
     * @param {String} login Логин пользователя
     * @return {Boolean} Результат проверки
     */
    checkLogin(login) {
        if (login.length < 6) {
            return false;
        }
        return true;
    }

    /**
     * Отрисовка компонента формы регистрации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signupForm.hbs'](this.#config),
        );

        const self = document.getElementById('signup-form');

        this.login = new Input(
            document.getElementsByClassName('signup-form__login')[0],
            this.#config.login,
        );
        this.login.render();

        this.password = new Input(
            document.getElementsByClassName('signup-form__password')[0],
            this.#config.password,
        );
        this.password.render();


        this.reapeatPassword = new Input(
            document.getElementsByClassName('signup-form__repeat-password')[0],
            this.#config.repeatPassword,
        );
        this.reapeatPassword.render();

        this.submit = new Button(self, this.#config.submit, this.#submitHandle);
        this.submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();
    }
}

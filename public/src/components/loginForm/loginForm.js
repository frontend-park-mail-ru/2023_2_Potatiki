import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 * Класс формы авторизации
 */
export default class LoginForm {
    #parent;

    #config;

    #submitHandle;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Function} submitHandle Функция, вызываемая при отправке формы
   */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }

    /**
   * Отрисовка компонента формы авторизации
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['loginForm.hbs'](this.#config),
        );

        const self = document.getElementById('login-form');

        const login = new Input(
            document.getElementsByClassName('login-form__login')[0],
            this.#config.login,
        );
        login.render();

        const password = new Input(
            document.getElementsByClassName('login-form__password')[0],
            this.#config.password,
        );
        password.render();

        const submit = new Button(self, this.#config.submit, this.#submitHandle);
        submit.render();

        const signupLink = new Link(self, this.#config.signup);
        signupLink.render();
    }
}

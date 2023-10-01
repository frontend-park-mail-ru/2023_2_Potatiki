import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import '../templates.js';

/**
 * Класс страницы регистрации
 */
export default class SignupPage {
    #parent;

    #config;

    #router;

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
        return document.getElementById('signup-page');
    }

    /**
   * Обработка формы регистрации
   * @param {Object} event Событие отправки формы
   */
    formListener(event) {
        event.preventDefault();
        const form = document.forms['signup-form'];
        const login = form.elements.login.value.trim();
        const name = form.elements.name.value.trim();
        const password = form.elements.password.value;
        const repeatPassword = form.elements['repeat-password'].value;
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

        for (let i = 0; i < login.length; ++i) {
            if (!(login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A ||
          login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A ||
          login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Валидация пароля
     * @param {String} pass Пароль пользователя
     * @return {Boolean} Результат проверки
     */
    checkPassword(pass) {
        if (pass.length < 6) {
            return false;
        }

        let isHasUpperLetter = false;
        let isHasLowerLetter = false;
        let isHasDigit = false;

        for (let i = 0; i < pass.length; ++i) {
            if (login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A) {
                isHasUpperLetter = true;
            }

            if (login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A) {
                isHasLowerLetter = true;
            }

            if (login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39) {
                isHasDigit = true;
            }
        }

        if (isHasDigit && isHasLowerLetter && isHasUpperLetter) {
            return true;
        }
    }

    // add removeListeners

    /**
   * Отрисовка страницы
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signup-page.hbs'](),
        );

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        const signupForm = new SignupForm(
            this.self,
            this.#config.signupPage.form,
            this.formListener.bind(this),
        );

        signupForm.render();

        signupForm.login.addFocusOutListener(this.checkLogin);
        signupForm.login.addFocusInListener();

        signupForm.password.addFocusOutListener(this.checkPassword);
        signupForm.password.addFocusInListener();
    }
}

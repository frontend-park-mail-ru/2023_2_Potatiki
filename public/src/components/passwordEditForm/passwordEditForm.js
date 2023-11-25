import './passwordEditForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './passwordEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {config} from '../../../config.js';


/**
<<<<<<< HEAD
 * Класс формы изменения пароля
 */
export default class PasswordEditForm {
    #parent;
    #config;

    oldPassword;
    newPassword;
    repeatPassword;
=======
 * Класс формы авторизации
 */
export default class PasswordEditForm {
    #parent;

    #config;

    oldPassword;

    newPassword;

    repeatPassword;

>>>>>>> origin/main
    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.passwordEditForm;
    }

    /**
<<<<<<< HEAD
     * Взятие элеиента компонента
=======
     *
>>>>>>> origin/main
     */
    get self() {
        return document.getElementById('password-edit-form');
    }

    /**
<<<<<<< HEAD
     * Функция обрабокти отправки формы
     * @param {Evnt} event Событие нажатие на кнопку отправки
=======
     *
     * @param {Evnt} event
>>>>>>> origin/main
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.updatePassword(this.oldPassword.self.value, this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
<<<<<<< HEAD
     * Вызов валидации для поля пароля
     * @param {Event} event Событие, вызывающее валидацию
=======
     *
     * @param {Event} event
>>>>>>> origin/main
     */
    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.newPassword.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
<<<<<<< HEAD
     * Вызова валидации для поля Повторить пароль
     * @param {Event} event Событие, вызывающее валидацию
=======
     *
     * @param {Event} event
>>>>>>> origin/main
     */
    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
<<<<<<< HEAD
     * Отображение ошибки для поля старого пароля
     * @param {String} errorText Текст ошибки
=======
     *
     * @param {String} errorText
>>>>>>> origin/main
     */
    renderOldPasswordError(errorText) {
        this.oldPassword.removeError();
        this.oldPassword.renderError(errorText);
    }

    renderOldPasswordError = this.renderOldPasswordError.bind(this);

    /**
<<<<<<< HEAD
     * Отображение ошибки для поля нового пароля
     * @param {String} errorText Текст ошибки
=======
     *
     * @param {String} errorText
>>>>>>> origin/main
     */
    renderPasswordError(errorText) {
        this.newPassword.removeError();
        this.newPassword.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
<<<<<<< HEAD
     * Отображение ошибки для поля повторить пароль
     * @param {String} errorText Текст ошибки
=======
     *
     * @param {String} errorText
>>>>>>> origin/main
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);

    /**
<<<<<<< HEAD
     * Добавление листенеров
=======
     *
>>>>>>> origin/main
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.newPassword.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
    }

    /**
<<<<<<< HEAD
     * Подписка на события
=======
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.subscribe(Events.REPEAT_PASSWORD_INPUT_ERROR, this.renderRepeatPasswordError);
        eventEmmiter.subscribe(Events.UPDATE_PASSWORD_FORM_ERROR, this.renderOldPasswordError);
    }

    /**
<<<<<<< HEAD
     * Отписка от событий
=======
     *
>>>>>>> origin/main
     */
    unsubscribeToEvents() {

    }

    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
     */
    removeListeners() {
    }

    /**
<<<<<<< HEAD
   * Отрисовка компонента формы изменения пароля
=======
   * Отрисовка компонента формы авторизации
>>>>>>> origin/main
   */
    render() {
        this.#parent.innerHTML = template(this.#config);

        this.oldPassword = new Input(
            document.querySelector('.info-edit-form__old-password'),
            this.#config.oldPassword,
        );
        this.oldPassword.render();

        this.newPassword = new Input(
            document.querySelector('.info-edit-form__new-password'),
            this.#config.newPassword,
        );
        this.newPassword.render();

        this.repeatPassword = new Input(
            document.querySelector('.info-edit-form__repeat-password'),
            this.#config.repeatPassword,
        );
        this.repeatPassword.render();

        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();

        this.addListeners();
        this.subscribeToEvents();
    }
}

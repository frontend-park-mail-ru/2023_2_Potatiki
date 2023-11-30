import './passwordEditForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './passwordEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {config} from '../../../config.js';


/**
 * Класс формы изменения пароля
 */
export default class PasswordEditForm {
    #parent;
    #config;

    oldPassword;
    newPassword;
    repeatPassword;
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
     * Взятие элеиента компонента
     */
    get self() {
        return document.getElementById('password-edit-form');
    }

    /**
     * Функция обрабокти отправки формы
     * @param {Evnt} event Событие нажатие на кнопку отправки
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.updatePassword(this.oldPassword.self.value, this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     * Вызов валидации для поля пароля
     * @param {Event} event Событие, вызывающее валидацию
     */
    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.newPassword.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
     * Вызова валидации для поля Повторить пароль
     * @param {Event} event Событие, вызывающее валидацию
     */
    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
     * Отображение ошибки для поля старого пароля
     * @param {String} errorText Текст ошибки
     */
    renderOldPasswordError(errorText) {
        this.oldPassword.removeError();
        this.oldPassword.renderError(errorText);
    }

    renderOldPasswordError = this.renderOldPasswordError.bind(this);

    /**
     * Отображение ошибки для поля нового пароля
     * @param {String} errorText Текст ошибки
     */
    renderPasswordError(errorText) {
        this.newPassword.removeError();
        this.newPassword.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
     * Отображение ошибки для поля повторить пароль
     * @param {String} errorText Текст ошибки
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);

    /**
     * Добавление листенеров
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.newPassword.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.subscribe(Events.REPEAT_PASSWORD_INPUT_ERROR, this.renderRepeatPasswordError);
        eventEmmiter.subscribe(Events.UPDATE_PASSWORD_FORM_ERROR, this.renderOldPasswordError);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Удаление листенеров
     */
    removeListeners() {
    }

    /**
   * Отрисовка компонента формы изменения пароля
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

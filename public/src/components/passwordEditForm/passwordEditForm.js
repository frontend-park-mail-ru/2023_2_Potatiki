import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './passwordEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {config} from '../../../config.js';


/**
 * Класс формы авторизации
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
     *
     */
    get self() {
        return document.querySelector('#password-edit-form');
    }

    /**
     *
     * @param {Evnt} event
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.updatePassword(this.oldPassword.self.value, this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.newPassword.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.newPassword.self.value,
            this.repeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderOldPasswordError(errorText) {
        this.oldPassword.removeError();
        this.oldPassword.renderError(errorText);
    }

    renderOldPasswordError = this.renderOldPasswordError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderPasswordError(errorText) {
        this.newPassword.removeError();
        this.newPassword.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.newPassword.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.subscribe(Events.REPEAT_PASSWORD_INPUT_ERROR, this.renderRepeatPasswordError);
        eventEmmiter.subscribe(Events.UPDATE_PASSWORD_FORM_ERROR, this.renderOldPasswordError);
    }

    /**
     *
     */
    unsubscribeToEvents() {

    }

    /**
     *
     */
    removeListeners() {
        // this.submit.self.removeEventListener('click', this.submitHandle);
    }

    /**
   * Отрисовка компонента формы авторизации
   */
    render() {
        this.#parent.innerHTML = template(this.#config);

        this.oldPassword = new Input(
            document.querySelector('.info-edit-form__old-password'),
            this.#config.oldPassword,
            // {inputName: 'old-password', inputPlaceholder: 'Старый пароль'},
        );
        this.oldPassword.render();

        this.newPassword = new Input(
            document.querySelector('.info-edit-form__new-password'),
            this.#config.newPassword,
            // {inputName: 'new-password', inputPlaceholder: 'Новый пароль',
            //    errorId: 'new-password-error'},
        );
        this.newPassword.render();

        this.repeatPassword = new Input(
            document.querySelector('.info-edit-form__repeat-password'),
            this.#config.repeatPassword,
            // {inputName: 'repeat-password', inputPlaceholder: 'Повторить пароль',
            //    errorId: 'repeat-password-error'},
        );
        this.repeatPassword.render();

        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();

        this.addListeners();
        this.subscribeToEvents();
    }
}

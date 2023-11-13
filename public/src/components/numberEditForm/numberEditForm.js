import './numberEditForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './numberEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {config} from '../../../config.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';


/**
 * Класс формы авторизации
 */
export default class NumberEditForm {
    #parent;

    #config;

    number;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.numberEditForm;
    }

    /**
     *
     */
    get self() {
        return document.querySelector('#number-edit-form');
    }

    /**
     *
     * @param {Evnt} event
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.updateNumber(this.number.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputPhoneHandle(event) {
        event.preventDefault();
        UserActions.validatePhone(this.number.self.value);
    }

    inputPhoneHandle = this.inputPhoneHandle.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        const el = this.number.self;
        const pattern = el.getAttribute('placeholder');
        const slots = new Set('_');
        const prev = ((j) => Array.from(pattern, (c, i) => slots.has(c)? j=i+1: j))(0);
        const first = [...pattern].findIndex((c) => slots.has(c));
        const accept = new RegExp(el.dataset.accept || '\\d', 'g');
        const clean = (input) => {
            input = input.match(accept) || [];
            return Array.from(pattern, (c) =>
                input[0] === c || slots.has(c) ? input.shift() || c : c,
            );
        };
        const format = () => {
            const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
                i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
                return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
            });
            el.value = clean(el.value).join``;
            el.setSelectionRange(i, j);
            back = false;
        };
        let back = false;
        el.addEventListener('keydown', (e) => back = e.key === 'Backspace');
        el.addEventListener('input', format);
        el.addEventListener('focus', format);
        el.addEventListener('blur', () => el.value === pattern && (el.value=''));
        el.addEventListener('focusout', this.inputPhoneHandle);
    }

    /**
     *
     * @param {String} errorText
     */
    renderPhoneError(errorText) {
        this.number.removeError();
        this.number.renderError(errorText);
    }

    renderPhoneError = this.renderPhoneError.bind(this);

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);
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
    }

    /**
   * Отрисовка компонента формы авторизации
   */
    render(number) {
        this.#parent.innerHTML = template(this.#config);

        this.#config.number.value = number;
        this.number = new Input(
            document.querySelector('.info-edit-form__number'),
            this.#config.number,
        );
        this.number.render();


        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();


        this.addListeners();
        this.subscribeToEvents();
    }
}

import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './numberEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {config} from '../../../config.js';


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
     */
    addListeners() {

    }

    /**
     *
     */
    subscribeToEvents() {

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

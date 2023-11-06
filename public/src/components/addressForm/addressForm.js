import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './addressForm.hbs';
import {UserActions} from '../../actions/user.js';
import {config} from '../../../config.js';


/**
 * Класс формы авторизации
 */
export default class AddressForm {
    #parent;

    #config;

    city;
    street;
    house;
    flat;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.addressForm;
    }

    /**
     *
     */
    get self() {
        return document.querySelector('#address-form');
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
   * @param {*} isAdd
   * @param {*} address
   */
    render(isAdd, address) {
        this.#parent.innerHTML = template(this.#config);

        if (!isAdd) {
            this.#config.city.value = address.city;
            this.#config.street.value = address.street;
            this.#config.house.value = address.house;
            this.#config.flat.value = address.flat;
        } else {
            this.#config.city.value = '';
            this.#config.street.value = '';
            this.#config.house.value = '';
            this.#config.flat.value = '';
        }

        this.city = new Input(
            document.querySelector('.address-form__city'),
            this.#config.city,
        );
        this.city.render();

        this.street = new Input(
            document.querySelector('.address-form__street'),
            this.#config.street,
        );
        this.street.render();

        this.house = new Input(
            document.querySelector('.address-form__house'),
            this.#config.house,
        );
        this.house.render();

        this.flat = new Input(
            document.querySelector('.address-form__flat'),
            this.#config.flat,
        );
        this.flat.render();

        this.submit = new Button(this.self,
            this.#config.submit);
        this.submit.render();

        this.addListeners();
        this.subscribeToEvents();
    }
}

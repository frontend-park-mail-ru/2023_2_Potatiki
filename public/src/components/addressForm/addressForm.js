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

    #isAdd;

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
        if (this.#isAdd) {
            UserActions.addAddress(this.city.self.value, this.street.self.value,
                this.house.self.value, this.flat.self.value);
        } else {
            UserActions.updateAddress(this.#config.addressId, this.#config.isCurrent,
                this.city.self.value,
                this.street.self.value,
                this.house.self.value, this.flat.self.value);
        }
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
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
        this.#isAdd = isAdd;
        this.#parent.innerHTML = template(this.#config);

        if (!isAdd) {
            console.log(address);
            this.#config.addressId = address.addressId;
            this.#config.isCurrent = address.isCurrent;
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

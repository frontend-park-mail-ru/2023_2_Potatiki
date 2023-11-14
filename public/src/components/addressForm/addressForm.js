import './addressForm.hbs';
import './addressForm.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
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
        return document.getElementById('address-form');
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
            UserActions.updateAddress(this.#config.addressId, this.#config.addressIsCurrent,
                this.city.self.value,
                this.street.self.value,
                this.house.self.value, this.flat.self.value);
        }
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputCityHandle(event) {
        event.preventDefault();
        UserActions.validateCity(this.city.self.value);
    }

    inputCityHandle = this.inputCityHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputStreetHandle(event) {
        event.preventDefault();
        UserActions.validateStreet(this.street.self.value);
    }

    inputStreetHandle = this.inputStreetHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputHouseHandle(event) {
        event.preventDefault();
        UserActions.validateHouse(this.house.self.value);
    }

    inputHouseHandle = this.inputHouseHandle.bind(this);

    /**
     *
     * @param {*} event
     */
    inputFlatHandle(event) {
        event.preventDefault();
        UserActions.validateFlat(this.flat.self.value);
    }

    inputFlatHandle = this.inputFlatHandle.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderCityError(errorText) {
        this.city.removeError();
        this.city.renderError(errorText);
    }

    renderCityError = this.renderCityError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderStreetError(errorText) {
        this.street.removeError();
        this.street.renderError(errorText);
    }

    renderStreetError = this.renderStreetError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderHouseError(errorText) {
        this.house.removeError();
        this.house.renderError(errorText);
    }

    renderHouseError = this.renderHouseError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderFlatError(errorText) {
        this.flat.removeError();
        this.flat.renderError(errorText);
    }

    renderStreetError = this.renderStreetError.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.city.self.addEventListener('focusout', this.inputCityHandle);
        this.street.self.addEventListener('focusout', this.inputStreetHandle);
        this.house.self.addEventListener('focusout', this.inputHouseHandle);
        this.flat.self.addEventListener('focusout', this.inputFlatHandle);
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CITY_INPUT_ERROR, this.renderCityError);
        eventEmmiter.subscribe(Events.STREET_INPUT_ERROR, this.renderStreetError);
        eventEmmiter.subscribe(Events.HOUSE_INPUT_ERROR, this.renderHouseError);
        eventEmmiter.subscribe(Events.FLAT_INPUT_ERROR, this.renderFlatError);
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
   * @param {*} isAdd
   * @param {*} address
   */
    render(isAdd, address) {
        this.#isAdd = isAdd;
        this.#parent.innerHTML = template(this.#config);

        if (!isAdd) {
            this.#config.addressId = address.addressId;
            this.#config.addressIsCurrent = address.addressIsCurrent;
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

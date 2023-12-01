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
 * Класс формы создания/изменения адреса
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
     * Получения элемента формы
     */
    get self() {
        return document.getElementById('address-form');
    }

    /**
     * Функция для обработки нажатия на кнопку отправки формы
     * @param {Event} event Событие нажания
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
     * Функция вызова валидации поля города
     * @param {Event} event Событие, вызвающее валидцию
     */
    inputCityHandle(event) {
        event.preventDefault();
        UserActions.validateCity(this.city.self.value);
    }

    inputCityHandle = this.inputCityHandle.bind(this);

    /**
     * Функция вызова валидации поля улицы
     * @param {Event} event Событие, вызвающее валидацию
     */
    inputStreetHandle(event) {
        event.preventDefault();
        UserActions.validateStreet(this.street.self.value);
    }

    inputStreetHandle = this.inputStreetHandle.bind(this);

    /**
     * Функция вызова валидации поля дома
     * @param {Event} event Событие, вызывающее валидацию
     */
    inputHouseHandle(event) {
        event.preventDefault();
        UserActions.validateHouse(this.house.self.value);
    }

    inputHouseHandle = this.inputHouseHandle.bind(this);

    /**
     * Функция вызова валидации поля квартиры
     * @param {Event} event Событие, вызывающее валидацию
     */
    inputFlatHandle(event) {
        event.preventDefault();
        UserActions.validateFlat(this.flat.self.value);
    }

    inputFlatHandle = this.inputFlatHandle.bind(this);

    /**
     * Функция отображения ошибки для поля города
     * @param {String} errorText Текст ошибки
     */
    renderCityError(errorText) {
        this.city.removeError();
        this.city.renderError(errorText);
    }

    renderCityError = this.renderCityError.bind(this);

    /**
     * Функция отображения ошибки для поля улицы
     * @param {String} errorText Текст ошибки
     */
    renderStreetError(errorText) {
        this.street.removeError();
        this.street.renderError(errorText);
    }

    renderStreetError = this.renderStreetError.bind(this);

    /**
     * Функция отображения ошибки для поля дома
     * @param {String} errorText Текст ошибки
     */
    renderHouseError(errorText) {
        this.house.removeError();
        this.house.renderError(errorText);
    }

    renderHouseError = this.renderHouseError.bind(this);

    /**
     * Функция отображения ошибки для поля квартиры
     * @param {String} errorText Текст ошибки
     */
    renderFlatError(errorText) {
        this.flat.removeError();
        this.flat.renderError(errorText);
    }

    renderFlatError = this.renderFlatError.bind(this);

    /**
     * Добавление листенеров элементам компонента
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.city.self.addEventListener('focusout', this.inputCityHandle);
        this.street.self.addEventListener('focusout', this.inputStreetHandle);
        this.house.self.addEventListener('focusout', this.inputHouseHandle);
        this.flat.self.addEventListener('focusout', this.inputFlatHandle);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CITY_INPUT_ERROR, this.renderCityError);
        eventEmmiter.subscribe(Events.STREET_INPUT_ERROR, this.renderStreetError);
        eventEmmiter.subscribe(Events.HOUSE_INPUT_ERROR, this.renderHouseError);
        eventEmmiter.subscribe(Events.FLAT_INPUT_ERROR, this.renderFlatError);
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
   * Отрисовка компонента формы добавления/изменения адреса
   * @param {Boolean} isAdd флаг для определения функции формы(добавление или изменение)
   * @param {Object} address Данные об адресе
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

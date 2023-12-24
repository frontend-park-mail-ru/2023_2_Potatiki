import template from './addressCard.hbs';
import './addressCard.scss';

/**
 * Класс компонента карточки адреса
 */
export default class AddressCard {
    #parent;
    #config;

    /**
     * Конструктор класса
     * @param {Object} parent Родительский компонент
     * @param {Object} config Конфиг отрисовки компонента
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Добавление листенера на кнопку изменения адреса
     * @param {Function} callback Функция, которая навешивается на кнопку
     */
    addEditEventListeners(callback) {
        document.querySelector(`#edit-${this.#config.addressId}`).
            addEventListener('click', callback);
    }

    /**
     * Добавления листенера на кнопку удаления адреса
     * @param {Function} callback Функция, которая навешивается нак нопку
     */
    addDeleteEventListeners(callback) {
        document.querySelector(`#delete-${this.#config.addressId}`)?.
            addEventListener('click', callback);
    }

    /**
     * Добавления листенера на кнопку выбора текущего адреса
     * @param {Function} callback Функция, которая навешивается на кнопку
     */
    addCurrentEventListeners(callback) {
        document.querySelector(`#current-${this.#config.addressId}`)?.
            addEventListener('click', callback);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {

    }

    /**
     * Удаление листенеров
     */
    removeEventListeners() {

    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Функция отрисовки компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}

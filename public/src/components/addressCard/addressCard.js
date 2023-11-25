import template from './addressCard.hbs';
import './addressCard.scss';

/**
<<<<<<< HEAD
 * Класс компонента карточки адреса
=======
 *
>>>>>>> origin/main
 */
export default class AddressCard {
    #parent;
    #config;

    /**
<<<<<<< HEAD
     * Конструктор класса
     * @param {Object} parent Родительский компонент
     * @param {Object} config Конфиг отрисовки компонента
=======
     *
     * @param {*} parent
     * @param {*} config
>>>>>>> origin/main
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
<<<<<<< HEAD
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
=======
     *
     * @param {*} callback
     */
    addEditEventListeners(callback) {
        document.querySelector(`#edit-${this.#config.addressId}`).addEventListener('click', callback);
    }

    /**
     *
     * @param {*} callback
     */
    addDeleteEventListeners(callback) {
        document.querySelector(`#delete-${this.#config.addressId}`)?.addEventListener('click', callback);
    }

    /**
     *
     * @param {*} callback
     */
    addCurrentEventListeners(callback) {
        document.querySelector(`#current-${this.#config.addressId}`)?.addEventListener('click', callback);
    }

    /**
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {

    }

    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
     */
    removeEventListeners() {

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
     * Функция отрисовки компонента
=======
     *
>>>>>>> origin/main
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}

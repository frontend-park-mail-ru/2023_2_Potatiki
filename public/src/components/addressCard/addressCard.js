import template from './addressCard.hbs';

/**
 *
 */
export default class AddressCard {
    #parent;
    #config;

    /**
     *
     * @param {*} parent
     * @param {*} config
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
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
     */
    subscribeToEvents() {

    }

    /**
     *
     */
    removeEventListeners() {

    }

    /**
     *
     */
    unsubscribeToEvents() {

    }

    /**
     *
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}

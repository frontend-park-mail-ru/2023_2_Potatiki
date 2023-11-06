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
        document.querySelector(`#edit-${this.#config.id}`).addEventListener('click', callback);
    }

    /**
     *
     * @param {*} callback
     */
    addDeleteEventListeners(callback) {
        document.querySelector(`#delete-${this.#config.id}`)?.addEventListener('click', callback);
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
        console.log(this.#parent, this.#config);
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}

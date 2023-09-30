import '../templates.js';

/**
 *
 */
export default class Button {
    #parent;

    #config;

    #submitHandle;

    /**
   *
   * @param {*} parent
   * @param {*} config
   * @param {*} submitHandle
   */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }

    /**
   *
   */
    get self() {
        return document.getElementById(this.#config.id);
    }

    /**
   *
   */
    addListeners() {
        document
            .getElementById(this.#config.id)
            .addEventListener('click', this.#submitHandle);
    }

    /**
   *
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['button.hbs'](this.#config),
        );
    }
}

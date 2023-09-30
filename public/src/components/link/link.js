import '../templates.js';

/**
 *
 */
export default class Link {
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
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['link.hbs'](this.#config),
        );
    }
}

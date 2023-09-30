import Button from '../button/button.js';
import Input from '../input/input.js';
import '../templates.js';

/**
 *
 */
export default class SearchForm {
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
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['searchForm.hbs'](this.#config),
        );

        const self = document.getElementById('search-form');

        const input = new Input(self, this.#config.input);
        input.render();

        const submit = new Button(self, this.#config.submit, this.#submitHandle);
        submit.render();
    }
}

import Button from '../button/button.js';
import Input from '../input/input.js';
import '../templates.js';


export default class SearchForm {
    #parent;
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render(submitHandle) {
        console.log("form-data", this.#config)
        this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['form.hbs'](this.#config));

        const self = document.getElementById("search-form");

        const input = new Input(self, this.#config.input);
        input.render();

        const submit = new Button(self, this.#config.submit);
        submit.render();
    }
}
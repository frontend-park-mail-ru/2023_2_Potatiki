import '../templates.js';


export default class Input {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(config) {
        this.#parent.innerHTML += window.Handlebars.templates['input.hbs'](config);
    }
}
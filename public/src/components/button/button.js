import '../templates.js';


export default class Button {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(data) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['button.hbs'](data))
    }
}

import '../templates.js';


export default class Button {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    addListeners(listener, id) {
        document
            .getElementById(id)
            .addEventListener("click", listener)
    }

    render(config, submitHandle) {
        console.log(config)
        this.#parent.innerHTML += window.Handlebars.templates['button.hbs'](config);
        this.addListeners(submitHandle, config.id)
    }
}
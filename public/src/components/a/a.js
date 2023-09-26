import '../templates.js';


export default class A {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    addListeners(listener, id) {
        document
            .getElementById(id)
            .addEventListener("click", listener)
    }

    render(config, listener) {
        this.#parent.innerHTML += window.Handlebars.templates['a.hbs'](config);
        
        console.log(listener, config)
        this.addListeners(listener, config.id)
    }
}
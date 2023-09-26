import Button from '../button/button.js';
import Input from '../input/input.js';
import '../templates.js';


export default class Form {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(config, submitHandle) {
        console.log("form-data", config)
        this.#parent.innerHTML += window.Handlebars.templates['form.hbs'](config);

        const self = document.getElementById(config.formId);

        config.inputs.forEach(element => {
            const input = new Input(self);
            input.render(element);
        });

        const submit = new Button(self);
        submit.render(config.submit, submitHandle);
    }
}
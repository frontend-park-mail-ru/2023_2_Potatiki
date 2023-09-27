import Button from '../button/button.js';
import Input from '../input/input.js';
import '../templates.js';

export default class Form {
  #parent;

  #config;

  #submitHandle;

  constructor(parent, config, submitHandle) {
    this.#parent = parent;
    this.#config = config;
    this.#submitHandle = submitHandle;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['form.hbs'](this.#config));

    const self = document.getElementById(this.#config.formId);

    this.#config.inputs.forEach((element) => {
      const input = new Input(self, element);
      input.render();
    });

    const submit = new Button(self, this.#config.submit, this.#submitHandle);
    submit.render();
  }
}

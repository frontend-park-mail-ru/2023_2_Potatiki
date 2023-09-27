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
    self.innerHTML = '';
    // this.#config.inputs.forEach((element) => {
    //   const input = new Input(self, Object.values(element)[0]);
    //   input.render();
    // });

    for (const inputConf in this.#config.inputs) {
      console.log(inputConf);
      const input = new Input(self, this.#config.inputs[inputConf]);
      input.render();
    }

    const submit = new Button(self, this.#config.submit, this.#submitHandle);
    submit.render();
  }
}

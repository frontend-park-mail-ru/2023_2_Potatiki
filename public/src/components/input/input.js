import '../templates.js';

export default class Input {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['input.hbs'](this.#config));
  }
}

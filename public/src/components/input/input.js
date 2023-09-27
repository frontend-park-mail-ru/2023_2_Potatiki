import '../templates.js';

export default class Input {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.innerHTML += window.Handlebars.templates['input.hbs'](this.#config);
  }
}

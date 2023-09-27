import '../templates.js';

export default class A {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['a.hbs'](this.#config));
  }
}

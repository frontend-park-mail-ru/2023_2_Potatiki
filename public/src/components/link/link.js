import '../templates.js';

export default class Link {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    console.log(this.#config);
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['link.hbs'](this.#config));
  }
}

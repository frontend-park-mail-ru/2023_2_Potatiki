import Button from '../button/button.js';
import Form from '../form/form.js';
import A from '../a/a.js';
import '../templates.js';

export default class Header {
  #parent;

  #config;

  #searchHandle;

  constructor(parent, config, searchHandle) {
    this.#parent = parent;
    this.#config = config;
    this.#searchHandle = searchHandle;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['header.hbs']());

    const self = document.getElementById('header');

    const logo = new A(self, this.#config.logo);
    logo.render();

    const catalog = new Button(self, this.#config.catalog);
    catalog.render();

    const search = new Form(self, this.#config.search, this.#searchHandle);
    search.render();

    const basket = new A(self, this.#config.basket);
    basket.render();

    const user = new A(self, this.#config.login);
    user.render();
  }
}

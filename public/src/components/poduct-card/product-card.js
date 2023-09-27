import Button from '../button/button.js';
import A from '../a/a.js';
import '../templates.js';

export default class ProductCard {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['product-card.hbs'](this.#config));

    const self = document.getElementById(this.#config.id);

    const img = new A(self.getElementsByClassName('product-img')[0], this.#config.img);
    img.render();

    const name = new A(self.getElementsByClassName('product-name')[0], this.#config.name);
    name.render();

    const button = new Button(self.getElementsByClassName('product-button')[0], this.#config.button);
    button.render();
  }
}

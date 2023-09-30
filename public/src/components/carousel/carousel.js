import Button from '../button/button.js';
import ProductCard from '../productCard/productCard.js';
import '../templates.js';

export default class Carousel {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['carousel.hbs'](this.#config));

    const self = document.getElementById(this.#config.id);

    const buttonLeft = new Button(self, this.#config.buttonLeft);
    buttonLeft.render();

    this.#config.productsList.forEach((element) => {
      const product = new ProductCard(self, element);
      product.render();
    });

    const buttonRight = new Button(self, this.#config.buttonRight);
    buttonRight.render();
  }
}

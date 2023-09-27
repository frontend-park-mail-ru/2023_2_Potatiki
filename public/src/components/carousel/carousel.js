import ProductCard from '../poduct-card/product-card.js';
import '../templates.js';

export default class Carousel {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['carousel.hbs']());

    const self = document.getElementById('carousel');

    this.#config.forEach((element) => {
      const product = new ProductCard(self, element);
      product.render();
    });
  }
}

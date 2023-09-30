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

  getConfig(data) {
    return {
      id: `product-${data.id}`,
      img: {
        id: `product-${data.id}-img`,
        aClass: 'ac1',
        aHref: `product-${data.id}`,
        withImg: true,
        withText: false,
        imgSrc: data.img,
      },
      name: {
        id: `product-${data.id}-name`,
        aClass: 'ac1',
        aHref: `product-${data.id}`,
        aText: data.name,
        withImg: false,
        withText: true,
      },
      button: {
        class: 'bc1',
        type: 'button',
        id: `product-${data.id}-button`,
        text: 'В корзину',
      },
      reviewsHref: 'review',
      starHref: './images/star.svg',
      starClass: 'sc1',
      productRate: data.rate,
      reviewsCountClass: 'rc1',
      reviewsCount: `${data.reviews_count} отзыва`,
      priceClass: 'pc1',
      price: '89999',
    };
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

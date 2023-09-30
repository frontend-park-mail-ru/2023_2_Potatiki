import Button from '../button/button.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 *
 */
export default class ProductCard {
    #parent;

    #config;

    /**
   *
   * @param {*} parent
   * @param {*} config
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
   *
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['productCard.hbs'](this.#config),
        );

        const self = document.getElementById(this.#config.id);

        const img = new Link(
            self.getElementsByClassName('product-card__img')[0],
            this.#config.img,
        );
        img.render();

        const name = new Link(
            self.getElementsByClassName('product-card__name')[0],
            this.#config.name,
        );
        name.render();

        const button = new Button(self, this.#config.button);
        button.render();
    }
}

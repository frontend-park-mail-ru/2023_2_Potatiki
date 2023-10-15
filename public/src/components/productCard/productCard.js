import Button from '../button/button.js';
import Link from '../link/link.js';
import template from './productCard.hbs';

/**
 * Класс компонента карточки товара
 */
export default class ProductCard {
    #parent;

    #config;

    #isAfterBegin;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг отрисовки класса
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
   * Отрисовка компонента карточки продукта
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );

        const self = document.querySelector(`#${this.#config.id}`);

        const img = new Link(
            self.querySelector('.product-card__img-place'),
            this.#config.img,
        );
        img.render();

        const name = new Link(
            self.querySelector('.product-card__name'),
            this.#config.name,
        );
        name.render();

        const button = new Button(self, this.#config.button);
        button.render();
    }
}

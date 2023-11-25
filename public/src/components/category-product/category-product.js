import './category-product.scss';
import AddToCartButton from '../addToCartButton/add-to-cart-button.js';
import Link from '../link/link.js';
import template from './category-product.hbs';


/**
 * Класс компонента карточки товара
 */
export default class CategoryProduct {
    #parent;
<<<<<<< HEAD
    #config;
=======

    #config;

>>>>>>> origin/main
    #isAfterBegin;

    button;

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
            self.querySelector('.category-card__img-place'),
            this.#config.img,
        );
        img.render();

        const name = new Link(
            self.querySelector('.category-card__name'),
            this.#config.name,
        );
        name.render();

        const button = new AddToCartButton(
            self.querySelector('.category-card__management'),
            this.#config.data,
            this.#config.id,
            'add-to-cart-container',
        );
        button.render();
    }
}

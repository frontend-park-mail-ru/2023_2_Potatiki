import Link from '../link/link.js';
import template from './order-products.hbs';
import './order-products.css';
import Button from '../button/button';

/**
 * Класс компонента карточки товара в заказе
 */
export default class OrderProducts {
    #parent;

    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    getConfig(data) {
        return {
            id: `${this.#config.id}-order-product-${data.id}`,
            data: `data-id=${data.id}`,
            imgSrc: './static/images/' + data.img,
            imgClass: 'order-product__img',
            textClass: 'order-product__text',
            class: 'order-product',
            text: data.rating % 2 == 0 ? '' : 'x2',
        };
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const self = document.querySelector(`.order-info__products`);

        this.#config.forEach((element) => {
            const product = new Link(
                self.querySelector('.order-info__products-container'),
                this.getConfig(element),
            );
            product.render();
        });
    }
}

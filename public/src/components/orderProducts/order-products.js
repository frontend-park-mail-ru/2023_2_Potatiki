import Link from '../link/link.js';
import template from './order-products.hbs';
import './order-products.css';
import {productRoute} from '../../config/urls.js';

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
            id: `${this.#config.id}-order-product-${data.productId}`,
            data: `data-id=${data.productId}`,
            imgSrc: '/static/images/' + data.img,
            imgClass: 'order-product__img',
            textClass: 'order-product__text',
            class: 'order-product',
            text: `x${data.quantity}`,
            href: productRoute + '/' + data.productId,
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

import './order-products.scss';
import Link from '../link/link.js';
import template from './order-products.hbs';
import {productRoute} from '../../config/urls.js';

/**
 * Класс компонента карточки товаров в заказе
 */
export default class OrderProducts {
    #parent;
    #config;
    #isWhite;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     * @param {Boolean} isWhite
     */
    constructor(parent, config, isWhite) {
        this.#parent = parent;
        this.#config = config;
        this.#isWhite = isWhite;
    }

    /**
     * Взятие конфига для отрисовки ссылок на товары, содержищиеся в заа=каза
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
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
        const whiteClass = this.#isWhite ? 'white-background-color' : 'not-white-color';
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template({whiteColorClass: whiteClass}),
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

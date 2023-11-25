import './order-item.scss';
import Link from '../link/link.js';
import template from './order-item.hbs';
import {productRoute} from '../../config/urls.js';

/**
<<<<<<< HEAD
 * Класс компонента карточки заказа на стрнице заказов
=======
 * Класс компонента карточки товара в заказе
>>>>>>> origin/main
 */
export default class OrderItem {
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

<<<<<<< HEAD
    /**
     * Взятие конфига для отрисовки компонента
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
=======

>>>>>>> origin/main
    getConfig(data) {
        return {
            id: `${this.#config.id}-order-product-${data.productId}`,
            data: `data-id=${data.productId}`,
            imgSrc: './static/images/' + data.img,
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

        const self = document.querySelector(`#${this.#config.id}`);

        this.#config.products.forEach((element) => {
            const product = new Link(
                self.querySelector('.order-info__products-container'),
                this.getConfig(element),
            );
            product.render();
        });
    }
}

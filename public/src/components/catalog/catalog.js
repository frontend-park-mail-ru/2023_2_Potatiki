import Link from '../link/link.js';
import template from './catalog.hbs';
import './catalog.css';
import {CartActions} from '../../actions/cart.js';
import {Events} from '../../config/events.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import OrderInfo from '../orderInfo/order-info.js';
import InfoRow from '../infoRow/info-row.js';
import {ProductsActions} from '../../actions/products.js';

/**
 * Класс компонента категорий
 */
export default class Catalog {
    #parent;

    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor() {
    }

    get self() {
        return document.querySelector('.catalog');
    }

    getConfig(data) {
        return {
            id: `${this.#config.id}-order-product-${data.id}`,
            data: `data-id=${data.id}`,
            imgSrc: './static/images/' + data.img,
            imgClass: 'order-product__img',
            textClass: 'order-product__text',
            class: 'order-product',
            text: `x${data.quantity}`,
        };
    }

    renderCategories(categories) {
        categories.forEach((category) => {
            const infoRows = new Array();

            const item = new Link(
                this.self.querySelector('.category-container'),
                {id: 'parent-' + category.categoryId,
                    text: category.categoryName,
                    class: 'category-parent',
                    href: `/category/${category.categoryId}`,
                });
            item.render();
            if (category.childs) {
                category.childs.forEach((child) => {
                    const midCHild = new Link(this.self.querySelector('.category-container'), {
                        id: 'child-' + child.categoryId,
                        text: child.categoryName,
                        class: 'category-child',
                        spanClass: 'child-text',
                        href: `/category/${child.categoryId}`,
                        // href: `/category?id=${child.id}&name=${child.name}`,
                    });
                    midCHild.render();
                    if (child.childs) {
                        child.childs.forEach((leaf) => {
                            const leafChild = new Link(this.self.querySelector('.category-container'), {
                                id: 'child-' + leaf.categoryId,
                                text: leaf.categoryName,
                                class: 'category-leaf',
                                spanClass: 'child-text',
                                href: `/category/${leaf.categoryId}`,
                                // href: `/category?id=${leaf.id}&name=${leaf.name}`,
                            });
                            leafChild.render();
                        });
                    }
                });
            }
        });
    }

    renderCategories = this.renderCategories.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CATEGORIES, this.renderCategories);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CATEGORIES, this.renderCategories);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        document.querySelector('#root').insertAdjacentHTML(
            'beforeend',
            template(),
        );
        this.subscribeToEvents();

        ProductsActions.getCategories();
    }
}
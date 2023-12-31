import './catalog.scss';
import Link from '../link/link.js';
import template from './catalog.hbs';
import {Events} from '../../config/events.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
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

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector('.catalog');
    }

    /**
     * Взятие конфига для отрисовки компонента
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
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

    /**
     * Отрисовка категорий
     * @param {Array} categories Массив категорий
     */
    renderCategories(categories) {
        categories.forEach((category) => {
            if (category.childs) {
                category.childs.forEach((child) => {
                    const midCHild = new Link(this.self.querySelector('.category-container'), {
                        id: 'child-' + child.categoryId,
                        text: child.categoryName,
                        class: 'category-child',
                        spanClass: 'child-text',
                        href: '',
                    });
                    midCHild.render();
                    if (child.childs) {
                        child.childs.forEach((leaf) => {
                            const leafChild = new Link(this.self.
                                querySelector('.category-container'), {
                                id: 'child-' + leaf.categoryId,
                                text: leaf.categoryName,
                                class: 'category-leaf',
                                spanClass: 'child-text',
                                href: `/category/${leaf.categoryId}`,
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

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CATEGORIES, this.renderCategories);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CATEGORIES, this.renderCategories);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        document.getElementById('container-main').insertAdjacentHTML(
            'beforeend',
            template(),
        );
        this.subscribeToEvents();

        ProductsActions.getCategories();
    }
}

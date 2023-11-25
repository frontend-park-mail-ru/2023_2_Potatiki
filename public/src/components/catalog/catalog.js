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
<<<<<<< HEAD
=======

>>>>>>> origin/main
    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor() {
    }

<<<<<<< HEAD
    /**
     * Взятие элемента компонента
     */
=======
>>>>>>> origin/main
    get self() {
        return document.querySelector('.catalog');
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
            id: `${this.#config.id}-order-product-${data.id}`,
            data: `data-id=${data.id}`,
            imgSrc: './static/images/' + data.img,
            imgClass: 'order-product__img',
            textClass: 'order-product__text',
            class: 'order-product',
            text: `x${data.quantity}`,
        };
    }

<<<<<<< HEAD
    /**
     * Отрисовка категорий
     * @param {Array} categories Массив категорий
     */
    renderCategories(categories) {
        categories.forEach((category) => {
            // const infoRows = new Array();
            // const item = new Link(
            //     this.self.querySelector('.category-container'),
            //     {id: 'parent-' + category.categoryId,
            //         text: category.categoryName,
            //         class: 'category-parent',
            //         href: `/category/${category.categoryId}`,
            //     });
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
                            const leafChild = new Link(this.self.
                                querySelector('.category-container'), {
=======
                            const leafChild = new Link(this.self.querySelector('.category-container'), {
>>>>>>> origin/main
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

<<<<<<< HEAD
    /**
     * Подписка на события
     */
=======
>>>>>>> origin/main
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CATEGORIES, this.renderCategories);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

<<<<<<< HEAD
    /**
     * Отписка от событий
     */
=======
>>>>>>> origin/main
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

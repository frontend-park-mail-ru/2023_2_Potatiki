import './carousel.scss';
import {productRoute, reviewRoute} from '../../config/urls.js';
import Button from '../button/button.js';
import ProductCard from '../productCard/productCard.js';
import template from './carousel.hbs';
import {rateCase} from '../../modules/utils.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

/**
 * Класс карусели продуктов
 */
export default class Carousel {
    #parent;
    #config;
    #cardCount;
    #currentPos;
    #leftPos;
    #rightPos;
    #singlePos;
    #data;
    #interval;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки класса
     * @param {Object} data Данные о товарах
     */
    constructor(parent, config, data) {
        this.#parent = parent;
        this.#config = config;
        this.#data = data;
        this.#singlePos = 0;
    }

    /**
     * Получение элемента класса
     */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
     * Конфигурация товара динамическими данными
     * @param {Object} data Данные о товаре
     * @return {Object} Сформированный конфиг карточки товара
     */
    getConfig(data) {
        return {
            id: `${this.#config.id}-product-${data.productId}`,
            data: data,
            quantity: data.quantity,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'product-card__img',
                class: 'product-card__img-link',
                href: productRoute + '/' + data.productId,
            },
            name: {
                text: data.productName,
                href: productRoute + '/' + data.productId,
                spanClass: 'product-card__name-text',
            },
            button: {
                class: 'product-card__button_size_in-cart button_disabled',
                type: 'button',
                id: `product-${data.productId}-button`,
                text: 'В корзину',
                imgSrc: '/static/images/cart.svg',
            },
            starHref: '/static/images/star-purple.svg',
            productRate: data.rating.toFixed(1),
            reviewsCount: data.countComments + ' ' + rateCase(data.countComments),
            reviewsHref: reviewRoute + '/' + data.productId,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    moveCarousel() {
        if (this.#rightPos < this.#data.length - 1) {
            this.slideRightListener();
        } else {
            this.#leftPos = 0;

            this.#rightPos = this.#cardCount;

            this.slideLeft();
        }
    }
    moveCarousel = this.moveCarousel.bind(this);

    /**
     * Рассчитывает количество видимых карточек
     */
    calcCardCount() {
        const containerWidth = document
            .querySelector('.carousel__container')
            .getBoundingClientRect().width;
        const cardWidth = document
            .querySelector('.product-card').getBoundingClientRect().width;
        this.#cardCount = Math.max(1, Math.min(Math.round(containerWidth / cardWidth) - 1,
            this.#data.length,
        ));
    }

    /**
     * Прокуручивание карусели вправо
     * @param {Event} event Событие
     */
    slideRight(event) {
        if (event) {
            clearInterval(this.#interval);
        }
        const newCard = this.self.querySelectorAll('.product-card');
        this.calcCardCount();
        this.#rightPos = Math.min(
            this.#data.length - 1,
            this.#rightPos + this.#cardCount,
        );

        this.#leftPos = Math.min(
            this.#data.length - 1 - this.#cardCount,
            this.#leftPos + this.#cardCount,
        );

        if (this.#cardCount === 1) {
            this.#singlePos = Math.min(this.#singlePos + 1, this.#data.length - 1);
            newCard[this.#singlePos].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
            return;
        }
        newCard[this.#rightPos].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
        });
    }

    /**
     * Прокуручивание карусели влево
     * @param {Event} event Событие
     */
    slideLeft(event) {
        if (event) {
            clearInterval(this.#interval);
        }
        const newCard = this.self.querySelectorAll('.product-card');
        this.calcCardCount();
        this.#leftPos = Math.max(
            0,
            Math.min(this.#data.length - 1 - this.#cardCount, this.#leftPos - this.#cardCount),
        );

        this.#rightPos = Math.max(
            this.#cardCount,
            this.#rightPos - this.#cardCount,
        );

        if (this.#cardCount === 1) {
            this.#singlePos = Math.max(this.#singlePos - 1, 0);
            newCard[this.#singlePos].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
            return;
        }


        newCard[this.#leftPos].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
        });
    }

    cancelMove(event) {
        clearInterval(this.#interval);
    }
    cancelMove = this.cancelMove.bind(this);

    /**
     * Прослушиватели событий для кнопки карусели
     */
    addListeners() {
        window.addEventListener('click', this.cancelMove);
        window.addEventListener('scroll', this.cancelMove);

        this.slideRightListener = this.slideRight.bind(this);

        document
            .querySelector(`#${this.#config.buttonRight.id}`)
            .addEventListener('click', this.slideRightListener);

        this.slideLeftListener = this.slideLeft.bind(this);

        document
            .querySelector(`#${this.#config.buttonLeft.id}`)
            .addEventListener('click', this.slideLeftListener);
    }

    /**
     * Удаление прослушивателей событий кнопок карусели
     */
    removeListeners() {
        document
            .querySelector(`#${this.#config.buttonRight.id}`)
            .removeEventListener('click', this.slideRightListener);

        document
            .querySelector(`#${this.#config.buttonLeft.id}`)
            .removeEventListener('click', this.slideLeftListener);

        clearInterval(this.#interval);
        window.removeEventListener('click', this.cancelMove);
        window.removeEventListener('scroll', this.cancelMove);
    }

    removeListeners = this.removeListeners.bind(this);

    subscribeToEvents = this.subscribeToEvents.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента карусели
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        this.subscribeToEvents();

        const buttonLeft = new Button(
            this.self.querySelector('.left-button'),
            this.#config.buttonLeft,
        );
        buttonLeft.render();

        this.#data.forEach((element) => {
            const product = new ProductCard(
                this.self.querySelector('.carousel__container'),
                this.getConfig(element),
            );
            product.render();
        });

        this.calcCardCount();
        this.#rightPos = this.#cardCount;
        this.#leftPos = 0;

        const buttonRight = new Button(
            this.self.querySelector('.right-button'),
            this.#config.buttonRight,
        );
        buttonRight.render();
        this.addListeners();
    }
}

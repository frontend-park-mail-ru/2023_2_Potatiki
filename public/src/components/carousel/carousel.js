import Button from '../button/button.js';
import ProductCard from '../productCard/productCard.js';
import template from './carousel.hbs';

/**
 * Класс карусели продуктов
 */
export default class Carousel {
    #parent;

    #config;

    #cardCount;

    #cardWidth;

    #currentPos;

    #data;
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
            id: `${this.#config.id}-product-${data.id}`,
            data: `data-id=${data.id}`,
            img: {
                imgSrc: './static/images/' + data.img,
                imgClass: 'product-card__img',
            },
            name: {
                text: data.name,
            },
            button: {
                class: 'product-card__button_size_in-cart button_disabled',
                type: 'button',
                id: `product-${data.id}-button`,
                text: 'В корзину',
                imgSrc: './static/images/cart.svg',
            },
            starHref: './static/images/star-purple.svg',
            productRate: data.rating,
            reviewsCount: `${data.reviews_count || 1139} отзывов`,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Прокуручивание карусели вправо
     * @param {Event} event Событие
     */
    slideRight(event) {
        event.preventDefault();
        const newCard = this.self.querySelectorAll('.product-card');
        this.#currentPos = Math.min(
            this.#data.length - 1,
            this.#currentPos + this.#cardCount * 2 - 1,
        );
        newCard[this.#currentPos].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    /**
     * Прокуручивание карусели влево
     * @param {Event} event Событие
     */
    slideLeft(event) {
        event.preventDefault();
        const newCard = this.self.querySelectorAll('.product-card');
        this.#currentPos = Math.max(
            0,
            this.#currentPos - this.#cardCount * 2 + 1,
        );
        newCard[this.#currentPos].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    /**
     * Прослушиватели событий для кнопки карусели
     */
    addListeners() {
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
    }

    /**
     * Отрисовка компонента карусели
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const buttonLeft = new Button(
            this.self.querySelector('.left-button'),
            this.#config.buttonLeft,
        );
        buttonLeft.render();

        this.#cardWidth = 300;
        this.#cardCount = Math.min(
            Math.round(window.innerWidth / this.#cardWidth),
            this.#data.length,
        );
        this.#currentPos = 0;

        this.#data.forEach((element) => {
            const product = new ProductCard(
                this.self.querySelector('.carousel__container'),
                this.getConfig(element),
            );
            product.render();
        });

        const buttonRight = new Button(
            this.self.querySelector('.right-button'),
            this.#config.buttonRight,
        );
        buttonRight.render();
        this.addListeners();
    }
}

import Button from '../button/button.js';
import ProductCard from '../productCard/productCard.js';
import '../templates.js';

/**
 * Класс карусели продуктов
 */
export default class Carousel {
    #parent;

    #config;

    #leftBorder;

    #rightBorder;

    #cardCount;

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
        this.#leftBorder = 0;
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
     * Получение индекса элемента из карусели
     * @param {Number} index Текущий индекс
     * @param {Number} diff Величина изменения
     * @return {Number} Новый  индекс
     */
    getIndex(index, diff) {
        const newIndex = index + diff;
        if (newIndex < 0) {
            return this.#data.length - 1;
        }
        if (newIndex > this.#data.length - 1) {
            return 0;
        }
        return newIndex;
    }

    /**
     * Прокуручивание карусели вправо
     * @param {Object} event Событие
     */
    slideRight(event) {
        event.preventDefault();
        const parent = this.self.querySelector('.carousel__container');
        const cards = this.self.querySelectorAll('.product-card');
        parent.removeChild(cards[0]);
        this.#rightBorder = this.getIndex(this.#rightBorder, 1);
        this.#leftBorder = this.getIndex(this.#leftBorder, 1);
        const product = new ProductCard(parent, this.getConfig(this.#data[this.#rightBorder]));
        product.render();
    }

    /**
     * Прокуручивание карусели влево
     * @param {Object} event Событие
     */
    slideLeft(event) {
        event.preventDefault();
        const parent = this.self.querySelector('.carousel__container');
        const cards = this.self.querySelectorAll('.product-card');
        parent.removeChild(cards[this.#cardCount - 1]);
        this.#leftBorder = this.getIndex(this.#leftBorder, -1);
        this.#rightBorder = this.getIndex(this.#rightBorder, -1);
        const product = new ProductCard(parent, this.getConfig(this.#data[this.#leftBorder]), true);
        product.render();
    }

    /**
     * Прослушиватели событий для кнопки карусели
     */
    addListeners() {
        document
            .querySelector(`#${this.#config.buttonRight.id}`)
            .addEventListener('click', this.slideRight.bind(this));

        document
            .querySelector(`#${this.#config.buttonLeft.id}`)
            .addEventListener('click', this.slideLeft.bind(this));
    }

    /**
     * Удаление прослушивателей событий кнопок карусели
     */
    removeListeners() {
        document
            .querySelector(`#${this.#config.buttonRight.id}`)
            .removeEventListener('click', this.slideRight.bind(this));

        document
            .querySelector(`#${this.#config.buttonLeft.id}`)
            .removeEventListener('click', this.slideLeft.bind(this));
    }

    /**
     * Отрисовка компонента карусели
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['carousel.hbs'](this.#config),
        );

        const buttonLeft = new Button(
            this.self.querySelector('.left-button'),
            this.#config.buttonLeft,
        );
        buttonLeft.render();

        const cardWidth = 300;
        this.#cardCount = Math.min(Math.round(window.innerWidth / cardWidth), this.#data.length);
        this.#rightBorder = this.#cardCount - 1;

        for (let i = 0; i < this.#cardCount; i++) {
            const product = new ProductCard(
                this.self.querySelector('.carousel__container'),
                this.getConfig(this.#data[i]),
            );
            product.render();
        }

        const buttonRight = new Button(
            this.self.querySelector('.right-button'),
            this.#config.buttonRight,
        );
        buttonRight.render();
        this.addListeners();
    }
}

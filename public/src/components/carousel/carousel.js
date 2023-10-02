import Button from '../button/button.js';
import ProductCard from '../productCard/productCard.js';
import '../templates.js';

/**
 * Класс карусели продуктов
 */
export default class Carousel {
    #parent;

    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     *
     * @param {*} data
     * @returns
     */
    getConfig(data) {
        return {
            id: `product-${data.id}`,
            data: `data-id=${data.id}`,
            img: {
                imgSrc: data.img,
            },
            name: {
                text: data.name,
            },
            starHref: './images/star.svg',
            productRate: data.rate,
            reviewsCount: `${data.reviews_count} отзыва`,
            price: data.price,
        };
    }

    /**
     * Отрисовка компонента карусели
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['carousel.hbs'](this.#config),
        );

        const self = document.getElementById(this.#config.id);

        const buttonLeft = new Button(self, this.#config.buttonLeft);
        buttonLeft.render();

        this.#config.productsList.forEach((element) => {
            const product = new ProductCard(self, this.getConfig(element));
            product.render();
        });

        const buttonRight = new Button(self, this.#config.buttonRight);
        buttonRight.render();
    }
}

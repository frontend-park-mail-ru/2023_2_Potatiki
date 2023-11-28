import './stars-row.scss';
import template from './stars-row.hbs';
import {greyStarSrc, yellowStarSrc} from '../../config/components';

/**
 * Класс компонента ряда звезд
 */
export default class StarsRow {
    #parent;

    #rate;

    #id;

    #starClass;

    #isAfterBegin;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {Number} rate Рейтинг
     * @param {String} id id родителя
     * @param {String} starClass класс для звезды
     * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
     */
    constructor(parent, rate, id, starClass, isAfterBegin) {
        this.#parent = parent;
        this.#rate = rate;
        this.#id = id;
        this.#starClass = starClass;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Получение жлемента из DOM
     */
    get self() {
        return document.getElementById(this.id);
    }

    /**
     * Геттер для id
     */
    get id() {
        return 'stars-row-' + this.#id;
    }

    /**
     * Получение звезды из DOM
     * @param {Number} index
     * @return {Element}
     */
    getStar(index) {
        return this.self.querySelector(`#${this.id}-star-${index}`);
    }

    /**
     * Изменение цвета звезды на серый
     * @param {Number} index
     */
    setStarGrey(index) {
        this.getStar(index).src = greyStarSrc;
    }

    /**
     * Изменение цвета звезды на желтый
     * @param {Number} index
     */
    setStarYellow(index) {
        this.getStar(index).src = yellowStarSrc;
    }

    /**
     * Получение источников для изображений
     */
    get sources() {
        const sourcesArray = [];
        const roundedRate = Math.round(this.#rate);
        for (let i = 0; i < 5; i++) {
            if (i < roundedRate) {
                sourcesArray.push({src: yellowStarSrc, id: `${this.id}-star-${i}`});
            } else {
                sourcesArray.push({src: greyStarSrc, id: `${this.id}-star-${i}`});
            }
            sourcesArray[i].starClass = this.#starClass;
        }
        return sourcesArray;
    }

    /**
   * Отрисовка компонента
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template({
                id: this.id,
                sources: this.sources,
                starClass: this.#starClass,
            }),
        );
    }
}

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
   * @param {Object} config Конфиг для отрисовки компонента
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, rate, id, starClass, isAfterBegin) {
        this.#parent = parent;
        this.#rate = rate;
        this.#id = id;
        this.#starClass = starClass;
        console.log(this.#starClass);
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     *
     */
    get self() {
        return document.getElementById(this.id);
    }

    /**
     *
     */
    get id() {
        return 'stars-row-' + this.#id;
    }

    getStar(index) {
        return this.self.querySelector(`#${this.id}-star-${index}`);
    }

    setStarGrey(index) {
        this.getStar(index).src = greyStarSrc;
    }

    setStarYellow(index) {
        this.getStar(index).src = yellowStarSrc;
    }

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

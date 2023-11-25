import './rate-row.scss';
import template from './rate-row.hbs';
import {rateCase} from '../../modules/utils';
import StarsRow from '../starsRow/stars-row';

/**
 * Класс компонента ряда рейтинга
 */
export default class RateRow {
    #parent;

    #rate;

    #id;

    #rateCount;

    #isAfterBegin;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, rate, id, rateCount, isAfterBegin) {
        this.#parent = parent;
        this.#rate = rate;
        this.#id = id;
        this.#rateCount = rateCount;
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
        return 'rate-row-' + this.#id;
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
                rate: `${this.#rate} ${rateCase(this.#rate)}`,
            }),
        );

        const starsRow = new StarsRow(
            this.self.querySelector('.rate-row__stars-row-place'),
            this.#rate,
            this.#id,
        );

        starsRow.render();
    }
}

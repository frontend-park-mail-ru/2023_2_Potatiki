import './stars-input.scss';
import template from './stars-input.hbs';
import StarsRow from '../starsRow/stars-row';

/**
 * Класс компонента инпута оценки
 */
export default class StarsInput {
    #parent;

    #id;

    #stars;

    #isAfterBegin;

    #hoverHandles;
    #overHandle;
    #clickHandles;
    #rate;
    #name;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, id, name, isAfterBegin) {
        this.#parent = parent;
        this.#id = id;
        this.#name = name;
        this.#isAfterBegin = isAfterBegin;
        this.#hoverHandles = [];
        this.#clickHandles = [];
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
        return 'stars-row-input-' + this.#id;
    }

    get rate() {
        return this.#rate;
    }

    /**
     * Отрисовка ошибки
     * @param {Object} error Ошибка
     */
    renderError(error) {
        const errorDiv = this.self.querySelector('.stars-input__error-place');
        if (errorDiv && !errorDiv.innerHTML) {
            errorDiv.insertAdjacentHTML('beforeend', error);
        }
    }

    /**
     * Удаление ошибки
     */
    removeError() {
        const errorDiv = this.self.querySelector('.stars-input__error-place');
        if (!errorDiv) return;
        errorDiv.innerHTML = '';
    }

    paintStars(count) {
        for (let i = 0; i < 5; i++) {
            if (i <= count) {
                this.#stars.setStarYellow(i);
            } else {
                this.#stars.setStarGrey(i);
            }
        }
    }

    addClickListeners() {
        for (let i = 0; i < 5; i++) {
            this.#clickHandles.push(this.removeHoverListeners.bind(this, i));
            this.#stars.getStar(i).addEventListener('click', this.#clickHandles[i]);
        }
    }

    addHoverListeners() {
        for (let i = 0; i < 5; i++) {
            this.#hoverHandles.push(this.paintStars.bind(this, i));
            this.#stars.getStar(i).addEventListener('mouseover', this.#hoverHandles[i]);
        }
        this.#overHandle = this.paintStars.bind(this, -1);
        this.self.addEventListener('mouseout', this.#overHandle);
    }

    removeHoverListeners(index) {
        this.#rate = index + 1;
        this.removeError();
        for (let i = 0; i < 5; i++) {
            this.paintStars(index);
            this.#stars.getStar(i).removeEventListener('mouseover', this.#hoverHandles[i]);
        }
        this.self.removeEventListener('mouseout', this.#overHandle);
    }

    // removeHoverListeners = this.removeHoverListeners.bind(this);

    /**
   * Отрисовка компонента
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template({
                id: this.id,
                name: this.#name,
            }),
        );
        this.#stars = new StarsRow(this.self.querySelector('.stars-input__stars'), 0, this.#id, 'stars-input__star', true);
        this.#stars.render();
        this.addHoverListeners();
        this.addClickListeners();
    }
}

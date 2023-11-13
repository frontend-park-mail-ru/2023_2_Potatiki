import './input.scss';
import template from './input.hbs';

/**
 * Класса компонента инпута
 */
export default class Input {
    #parent;

    #config;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Получение элемента инпута
     */
    get self() {
        return document.querySelector(`[name=${this.#config.inputName}]`);
    }

    /**
     * Отрисовка ошибки
     * @param {Object} error Ошибка
     */
    renderError(error) {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        if (errorDiv && !errorDiv.innerHTML) {
            errorDiv.insertAdjacentHTML('beforeend', error);
        }
    }

    /**
     * Удаление ошибки
     */
    removeError() {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        if (!errorDiv) return;
        errorDiv.innerHTML = '';
    }


    /**
     * Отрисовка компонента инпута
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}

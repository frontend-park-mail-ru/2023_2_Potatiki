import '../templates.js';

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

    addFocusOutListener(callback) {
        const self = document.getElementsByName(this.#config.inputName)[0];
        self.addEventListener('focusout', (event) => {
            if (!callback(self.value)) {
                this.renderError('Error!');
            }
        });
    }

    addFocusInListener() {
        const self = document.getElementsByName(this.#config.inputName)[0];
        self.addEventListener('focusin', (event) => {
            this.removeError();
        });
    }

    renderError(error) {
        const errorDiv = document.getElementById(this.#config.errorId);
        errorDiv.insertAdjacentHTML('beforeend', error);
        console.log('error', error);
    }

    removeError() {
        const errorDiv = document.getElementById(this.#config.errorId);
        errorDiv.innerHTML = '';
        console.log('no error');
    }

    /**
     * Отрисовка компонента инпута
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['input.hbs'](this.#config),
        );
    }
}

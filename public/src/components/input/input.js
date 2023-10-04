import '../templates.js';

/**
 * Класса компонента инпута
 */
export default class Input {
    #parent;

    #config;

    focusInHandle;

    focusOutHandle;

    value;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.value = '';
    }

    get self() {
        return document.getElementsByName(this.#config.inputName)[0];
    }

    addFocusOutListener(callback) {
        this.focusOutHandle = (event) => {
            this.value = this.self.value;
            const err = callback(this.self.value);
            if (err) {
                this.self.style.borderColor = 'var(--color-incorrect)';
                this.renderError(err);
            }
        };

        this.self.addEventListener('focusout', this.focusOutHandle);
    }

    addFocusInListener() {
        this.focusInHandle = (event) => {
            this.self.style.borderColor = '#babfff';
            this.removeError();
        };
        this.self.addEventListener('focusin', this.focusInHandle);
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

    removeListeners() {
        if (this.focusOutHandle !== undefined) {
            this.self.removeEventListener('focusout', this.focusOutHandle);
        }

        if (this.focusInHandle !== undefined) {
            this.self.removeEventListener('focusin', this.focusInHandle);
        }
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

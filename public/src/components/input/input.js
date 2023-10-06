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

    /**
     * Получение элемента инпута
     */
    get self() {
        return document.querySelector(`[name=${this.#config.inputName}]`);
    }

    /**
     * Добавление обработчика на событие 'focusout'
     * @param {Function} callback Функция вызываемая при событии 'focusout'
     */
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

    /**
     * Добавление обработчика на событие 'focusin'
     */
    addFocusInListener() {
        this.focusInHandle = (event) => {
            this.self.style.borderColor = '#babfff';
            this.removeError();
        };
        this.self.addEventListener('focusin', this.focusInHandle);
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
     * Удаление обработчиков событий
     */
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

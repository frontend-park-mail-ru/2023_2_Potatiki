import '../templates.js';

/**
 *
 */
export default class Input {
    #parent;

    #config;

    value;

    /**
   *
   * @param {*} parent
   * @param {*} config
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

   

    /**
   *
   */

    addFocusOutListener(callback) {
        const self = document.getElementsByName(this.#config.inputName)[0];
        self.addEventListener('focusout', (event) => {
            this.value = self.value;
            const err = callback(self.value);
            if (err) {
                self.style.borderColor = 'var(--color-incorrect)';
                this.renderError(err);
            }
        });
    }

    addFocusInListener() {
        const self = document.getElementsByName(this.#config.inputName)[0]
        self.addEventListener('focusin', (event) => {
            self.style.borderColor = '#babfff';
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

    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['input.hbs'](this.#config),
        );
    }
}

import '../templates.js';

export default class Button {
  #parent;

  #config;

  #submitHandle;

  constructor(parent, config, submitHandle) {
    this.#parent = parent;
    this.#config = config;
    this.#submitHandle = submitHandle;
  }

  // addListeners() {
  //     document
  //         .getElementById(this.#config.id)
  //         .addEventListener("click", this.#submitHandle)
  // }

  render() {
    // this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['button.hbs'](this.#config));
    console.log(this.#config);
    const button = document.createElement('button');
    button.setAttribute('class', this.#config.class);
    button.setAttribute('type', this.#config.type);
    button.setAttribute('id', this.#config.id);
    button.addEventListener('click', this.#submitHandle, { once: true }); // не удаляется?
    button.innerHTML = window.Handlebars.templates['button.hbs'](this.#config);
    this.#parent.appendChild(button);
  }
}

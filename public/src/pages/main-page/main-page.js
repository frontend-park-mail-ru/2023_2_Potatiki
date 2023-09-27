import Header from '../../components/header/header.js';

import '../templates.js';

/**
 * Класс главной страницы
 */
export default class MainPage { // extends BasePage {
  #parent;

  #config;

  /**
     *
     * @param {*} parent
     * @param {*} config
     */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  searchFormListener(e) {
    e.preventDefault();
    const form = document.forms['search-form'];
    const search = form.elements.search.value;
    console.log('search', search);
  }

  render() {
    this.#parent.innerHTML = '';

    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['main-page.hbs']());

    const self = document.getElementById('main-page');
    const header = new Header(self, this.#config.mainPage, this.searchFormListener.bind(this));
    header.render();
  }
}

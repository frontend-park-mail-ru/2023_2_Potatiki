import Button from '../button/button.js';
import Link from '../link/link.js';
import SearchForm from '../searchForm/searchForm.js';
import '../templates.js';

export default class Header {
  #parent;

  #config;

  #searchHandle;

  #isAuth;

  constructor(parent, config, searchHandle, isAuth) {
    this.#parent = parent;
    this.#config = config;
    this.#searchHandle = searchHandle;
    this.#isAuth = isAuth;
  }

  render() {
    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['header.hbs']());

    const self = document.getElementById('header');

    const logo = new Link(self, this.#config.logo);
    logo.render();

    const catalog = new Button(self, this.#config.catalog);
    catalog.render();

    const search = new SearchForm(self, this.#config.search, this.#searchHandle);
    search.render();

    const orders = new Link(self, this.#config.orders);
    orders.render();

    const favorite = new Link(self, this.#config.favorite);
    favorite.render();

    const basket = new Link(self, this.#config.basket);
    basket.render();

    const profileState = this.#isAuth ? this.#config.profile : this.#config.login;

    const user = new Link(self, profileState);
    user.render();

    if (this.#isAuth) {
      const logout = new Link(self, this.#config.logout);
      logout.render();
    }
  }
}

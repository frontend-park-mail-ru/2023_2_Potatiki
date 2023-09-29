import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';

import '../templates.js';

/**
 * Класс главной страницы
 */
export default class MainPage {
  #parent;

  #config;

  #router;

  #ajax;

  /**
     *
     * @param {*} parent
     * @param {*} config
     */
  constructor(parent, config, router, ajax) {
    this.#parent = parent;
    this.#config = config;
    this.#router = router;
    this.#ajax = ajax;
  }

  // getProduct(id) {
  //   const [statusCode, message] = this.#ajax.getRequest(`/api/v1/product/${id}`);
  //   switch (statusCode) {
  //     case 200:
  //       // ???
  //       break;
  //     default:
  //       console.log('undefined status code');
  //       break;
  //   }
  // }
  // {
  //   uuid:
  //   img:
  //   name:
  //   category:
  //   price:
  //   rate:
  //   reviews_count:
  // }

  renderServerError(msg) {
    const serverError = document.createElement('div');
    serverError.setAttribute('server-error');
    serverError.textContent = msg;
    document.body.appendChild(serverError);
    setTimeout(() => {
      document.body.removeChild(document.getElementById('server-error'));
    }, 5000);
  }

  getProducts() {
    const [statusCode, message] = this.#ajax.getRequest('/api/v1/product');
    switch (statusCode) {
      case 200:
        const carousel = new Carousel(self, message.body);
        carousel.render();
        break;
      case 500:
        this.renderServerError(message);
        break;
      default:
        console.log('undefined status code');
        break;
    }
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
    const header = new Header(
      self,
      this.#config.mainPage,
      this.searchFormListener.bind(this),
      this.#config.isAuthorized,
    );
    header.render();

    this.getProducts();
  }
}

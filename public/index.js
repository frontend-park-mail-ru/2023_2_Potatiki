import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';

const root = document.getElementById('root');
console.log('root');

let page = 'main';

const productsList = [{
  id: 'product-1',
  img: {
    id: 'product-1-img',
    aClass: 'ac1',
    aHref: 'product-1',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-1-name',
    aClass: 'ac1',
    aHref: 'product-1',
    aText: 'Apple MacBook Air 13 M1/8/256 Space Gray',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-1-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '4.8',
  reviewsCountClass: 'rc1',
  reviewsCount: '142 отзыва',
  priceClass: 'pc1',
  price: '8 9999 ₽',
},
{
  id: 'product-2',
  img: {
    id: 'product-2-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-2-name',
    aClass: 'ac1',
    aHref: 'product-2',
    aText: 'Macbook air',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-2-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '11 9999 ₽',
}, 
{
id: 'product-5',
  img: {
    id: 'product-5-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-2-name',
    aClass: 'ac1',
    aHref: 'product-2',
    aText: 'Macbook air',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-2-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '11 9999 ₽',
},

{ id: 'product-6',
  img: {
    id: 'product-6-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-6-name',
    aClass: 'ac1',
    aHref: 'product-2',
    aText: 'Macbook air',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-6-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '11 9999 ₽',
}];

const productsList2 = [{
  id: 'product-3',
  img: {
    id: 'product-3-img',
    aClass: 'ac1',
    aHref: 'product-1',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-3-name',
    aClass: 'ac1',
    aHref: 'product-1',
    aText: 'Apple MacBook Air 13 M1/8/256 Space Gray',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-3-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '4.8',
  reviewsCountClass: 'rc1',
  reviewsCount: '142 отзыва',
  priceClass: 'pc1',
  price: '8 9999 ₽',
},
{
  id: 'product-4',
  img: {
    id: 'product-4-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-4-name',
    aClass: 'ac1',
    aHref: 'product-2',
    aText: 'Macbook air',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-4-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '11 9999 ₽',
},
{
  id: 'product-7',
  img: {
    id: 'product-3-img',
    aClass: 'ac1',
    aHref: 'product-1',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-3-name',
    aClass: 'ac1',
    aHref: 'product-1',
    aText: 'Apple MacBook Air 13 M1/8/256 Space Gray',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-3-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '4.8',
  reviewsCountClass: 'rc1',
  reviewsCount: '142 отзыва',
  priceClass: 'pc1',
  price: '8 9999 ₽',
},
{
  id: 'product-8',
  img: {
    id: 'product-4-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './static/images/macbook.png',
  },
  name: {
    id: 'product-4-name',
    aClass: 'ac1',
    aHref: 'product-2',
    aText: 'Macbook air',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'button product-card__button_size_in-cart',
    type: 'button',
    id: 'product-4-button',
    text: 'В корзину',
    withImg: true,
    imgSrc: './static/images/cart.svg',
  },
  reviewsHref: 'review',
  starHref: './static/images/star-purple.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '11 9999 ₽',
}];

const config = {
  isAuthorized: false,
  mainPage:
    {
      logo: {
        id: 'logo-button',
        aClass: 'header__link_size_logo',
        aHref: 'main',
        withImg: true,
        imgSrc: './static/images/logo.svg',
      },

      catalog: {
        class: 'button header__button_size_catalog',
        type: 'button',
        text: 'Каталог',
        id: 'catalog-button',
        withImg: true,
        imgSrc: './static/images/burger.svg',
      },

      search: {
        formId: 'search-form',
        formName: 'search-form',
        formClass: 'search-form',
        input:  {
            inputClass: 'input serch-form__input',
            inputName: 'search',
            inputPlaceholder: 'Я хочу найти',
            error: false,
            label: false,
          },
        submit: {
          class: 'button search-form__button_size_search',
          type: '',
          text: '',
          id: 'search-button',
          withImg: true,
          imgSrc: './static/images/search.svg',
        },

      },

      orders: {
        id: 'orders-button',
        aClass: 'link__icon',
        aHref: '#',
        withImg: true,
        withText: true,
        aText: 'Заказы',
        imgSrc: './static/images/order-box.svg',
      },

      favorite: {
        id: 'favorite-button',
        aClass: 'link__icon',
        aText: 'Избранное',
        aHref: 'login',
        withImg: true,
        withText: true,
        imgSrc: './static/images/like-icon.svg',
      },

      basket: {
        id: 'basket-button',
        aClass: 'link__icon',
        aHref: '#',
        withImg: true,
        withText: true,
        aText: 'Корзина',
        imgSrc: './static/images/cart-icon.svg',
      },

      login: {
        id: 'login-button',
        aClass: 'link__icon',
        aText: 'Войти',
        aHref: 'login',
        withImg: true,
        withText: true,
        imgSrc: './static/images/login.svg',
      },

      profile: {
        id: 'profile-button',
        aClass: 'ac1',
        aHref: 'profile',
        aText: 'Профиль',
        withImg: true,
        withText: true,
        imgSrc: './images/user.svg',
      },

      logout: {
        id: 'logout-button',
        aClass: 'ac1',
        aHref: 'logout',
        aText: 'Выйти',
        withImg: true,
        withText: true,
        imgSrc: './images/logout.svg',
      },

      products: {id:'new-carousel', name:'Новинки', productsList: productsList, 
      buttonLeft: {class: 'button carousel__button',
      type: 'button',
      id: 'carousel-button-left',
      withImg: true,
      imgSrc: './static/images/arrow-left.svg',}, 
      buttonRight: {class: 'button carousel__button',
      type: 'button',
      id: 'carousel-button-right',
      withImg: true,
      imgSrc: './static/images/arrow-right.svg',}},

      products2: {id:'popular-carousel', name:'Хиты продаж', productsList: productsList2, 
      buttonLeft: {class: 'button carousel__button',
      type: 'button',
      id: 'carousel-button-left',
      withImg: true,
      imgSrc: './static/images/arrow-left.svg',}, 
      buttonRight: {class: 'button carousel__button',
      type: 'button',
      id: 'carousel-button-right',
      withImg: true,
      imgSrc: './static/images/arrow-right.svg',}},
    },

  loginPage: {

    formName: 'login-form',
    formId: 'login-form',

    logo: {
      id: 'logo-button',
      aClass: 'login-page__logo',
      aHref: 'main',
      withImg: true,
      imgSrc: './static/images/logo.svg',
    },

    inputs: {
      login: {
        inputClass: 'ic1',
        inputName: 'login',
        inputPlaceholder: 'Введите логин',
        error: false,
        label: false,
      },
      password: {
        inputClass: 'ic1',
        inputName: 'password',
        inputPlaceholder: 'Введите пароль',
        error: false,
        label: false,
        inputType: 'password',
      },
    },

    submit: {
      class: 'bc1',
      type: 'button',
      id: 'login-submit-button',
      text: 'Login',
    },
  },
};

const renderMainPage = (router, isAuth) => {
  config.isAuthorized = isAuth;
  const main = new MainPage(root, config, router);
  main.render();
};

const renderLoginPage = (router, isAuth) => {
  config.isAuthorized = isAuth;
  const login = new LoginPage(root, config, router);
  login.render();
};

const changePage = (href, isAuth) => {
  switch (href) {
    case 'main':
      if (page !== 'main') {
        renderMainPage(changePage, isAuth);
        page = 'main';
      }
      break;
    case 'login':
      if (page !== 'login') {
        renderLoginPage(changePage, isAuth);
        page = 'login';
      }
      break;
    case 'logout':
      renderMainPage(changePage, false);
      break;
    default:
      console.log('undefined click');
  }
};

const listenClick = (e) => {
  e.preventDefault();
  const anchor = e.target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  changePage(href);
};

window.addEventListener('click', listenClick);
renderMainPage(changePage, false);

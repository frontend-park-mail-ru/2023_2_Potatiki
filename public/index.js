import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import Ajax from './src/modules/ajax.js';

const ajax = new Ajax('https://localhost', 3000);

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
    imgSrc: './images/product.jpeg',
  },
  name: {
    id: 'product-1-name',
    aClass: 'ac1',
    aHref: 'product-1',
    aText: 'Macbook',
    withImg: false,
    withText: true,
  },
  button: {
    class: 'bc1',
    type: 'button',
    id: 'product-1-button',
    text: 'В корзину',
  },
  reviewsHref: 'review',
  starHref: './images/star.svg',
  starClass: 'sc1',
  productRate: '4.8',
  reviewsCountClass: 'rc1',
  reviewsCount: '142 отзыва',
  priceClass: 'pc1',
  price: '89999',
},
{
  id: 'product-2',
  img: {
    id: 'product-2-img',
    aClass: 'ac1',
    aHref: 'product-2',
    withImg: true,
    withText: false,
    imgSrc: './images/product.jpeg',
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
    class: 'bc1',
    type: 'button',
    id: 'product-2-button',
    text: 'В корзину',
  },
  reviewsHref: 'review',
  starHref: './images/star.svg',
  starClass: 'sc1',
  productRate: '5.0',
  reviewsCountClass: 'rc1',
  reviewsCount: '144 отзыва',
  priceClass: 'pc1',
  price: '119999',
}];

const config = {
  isAuthorized: false,
  mainPage:
    {
      logo: {
        id: 'logo-button',
        aClass: 'ac1',
        aHref: 'main',
        withImg: true,
        imgSrc: './images/zuzu.png',
      },

      catalog: {
        class: 'bc2',
        type: 'button',
        text: 'Каталог',
        id: 'catalog-button',
      },

      search: {
        formId: 'search-form',
        formName: 'search-form',
        formClass: 'fc1',
        inputs: {
          search: {
            inputClass: 'ic1',
            inputName: 'search',
            inputPlaceholder: 'Найдите свой товар',
            error: false,
            label: false,
          },
        },
        submit: {
          class: 'bc3',
          type: 'button',
          text: 'Найти',
          id: 'search-button',
        },

      },

      basket: {
        id: 'basket-button',
        aClass: 'ac1',
        aHref: '#',
        withImg: true,
        withText: true,
        imgSrc: './images/basket.svg',
      },

      login: {
        id: 'login-button',
        aClass: 'ac1',
        aText: 'Войти',
        aHref: 'login',
        withImg: true,
        withText: true,
        imgSrc: './images/user.svg',
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

      products: productsList,

    },

  loginPage: {

    formName: 'login-form',
    formId: 'login-form',

    logo: {
      id: 'logo-button',
      aClass: 'ac1',
      aHref: 'main',
      withImg: true,
      imgSrc: './images/zuzu.png',
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
  const main = new MainPage(root, config, router, ajax);
  main.render();
};

const renderLoginPage = (router, isAuth) => {
  config.isAuthorized = isAuth;
  const login = new LoginPage(root, config, router, ajax);
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

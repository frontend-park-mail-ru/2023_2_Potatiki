import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';

const root = document.getElementById('root');
console.log('root');

let page = 'main';

const config = {
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
        inputs: [
          {
            inputClass: 'ic1',
            inputName: 'search',
            inputPlaceholder: 'Найдите свой товар',
            error: false,
            label: false,
          },
        ],
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
        imgSrc: './images/basket.svg',
      },

      login: {
        id: 'login-button',
        aClass: 'ac1',
        aHref: 'login',
        withImg: true,
        imgSrc: './images/user.svg',
      },

      logout: {
        id: 'logout-button',
        aClass: 'ac1',
        aHref: '#',
        withImg: true,
        imgSrc: './images/logaut.svg',
      },

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

    inputs: [{
      inputClass: 'ic1',
      inputName: 'login',
      inputPlaceholder: 'Введите логин',
      error: false,
      label: false,
    },

    {
      inputClass: 'ic1',
      inputName: 'password',
      inputPlaceholder: 'Введите пароль',
      error: false,
      label: false,
      inputType: 'password',
    },
    ],

    submit: {
      class: 'bc1',
      type: 'button',
      id: 'login-submit-button',
      text: 'Login',
    },
  },
};

const renderMainPage = () => {
  const main = new MainPage(root, config);
  main.render();
};

const renderLoginPage = () => {
  const login = new LoginPage(root, config);
  login.render();
};

const changePage = (e) => {
  e.preventDefault();
  const anchor = e.target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  switch (href) {
    case 'main':
      if (page != 'main') {
        renderMainPage();
        page = 'main';
      }
      break;
    case 'login':
      if (page != 'login') {
        renderLoginPage();
        page = 'login';
      }
      break;
  }
};

window.addEventListener('click', changePage);
renderMainPage();

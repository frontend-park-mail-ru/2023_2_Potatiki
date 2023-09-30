import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import SignupPage from './src/pages/signup-page/signup-page.js';
import {config} from '/config.js';
import Ajax from './src/modules/ajax.js';

const ajax = new Ajax('https://localhost', 3000);

const root = document.getElementById('root');

let page = 'main';

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

const renderSignupPage = (router, isAuth) => {
  config.isAuthorized = isAuth;
  const signup = new SignupPage(root, config, router);
  signup.render();
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
    case 'signup':
      if (page !== 'signup') {
        renderSignupPage(changePage, isAuth);
        page = 'signup';
      }
      break;
    case 'logout':
      renderMainPage(changePage, false);
      break;
    default:
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

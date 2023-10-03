import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import SignupPage from './src/pages/signup-page/signup-page.js';
import Ajax from './src/modules/ajax.js';
import renderServerError from './src/modules/server-error.js';
import {config} from './config.js';

const root = document.getElementById('root');
let pageObject;

/**
 * Отрисовка главной страницы
 * @param {Boolean} isAuth Статус авторизации
 */
const renderMainPage = (isAuth) => {
    config.isAuthorized = isAuth;
    pageObject?.removeListeners();
    pageObject = new MainPage(root, config, changePage);
    pageObject.render();
};

/**
 * Отрисовка страницы авторизации
 */
const renderLoginPage = () => {
    pageObject.removeListeners();
    pageObject = new LoginPage(root, config, changePage);
    pageObject.render();
};

/**
 * Отрисовка страницы регистрации
 */
const renderSignupPage = () => {
    pageObject.removeListeners();
    pageObject = new SignupPage(root, config, changePage);
    pageObject.render();
};

/**
 * Функция осуществляющая переход на нужную страницу
 * @param {String} href Путь к странице
 * @param {Boolean} isAuth статус авторизации
 */
const changePage = (href, isAuth) => {
    console.log(config.page, href);
    switch (href) {
    case 'main':
        if (config.page !== 'main') {
            renderMainPage(isAuth);
            config.page = 'main';
        }
        break;
    case 'login':
        if (config.page !== 'login') {
            renderLoginPage();
            config.page = 'login';
        }
        break;
    case 'signup':
        if (config.page !== 'signup') {
            renderSignupPage();
            config.page = 'signup';
        }
        break;
    case 'logout':
        renderMainPage(false);
        Ajax.prototype.getRequest('auth/logout');
        break;
    default:
    }
};

/**
 * Listener для нажатий по ссылкам
 * @param {Object} event Событие нажатия по ссылке
 */
const listenClick = (event) => {
    event.preventDefault();
    const anchor = event.target.closest('a');
    if (!anchor) return;
    changePage(anchor.getAttribute('href'));
};

window.addEventListener('click', listenClick);

/**
 * Функция проверяет авторизован ли пользователь и
 * отображает соответствующий вид страницы
 */
const checkSession = () => {
    Ajax.prototype.getRequest('auth/check_auth').then((result) => {
        const [statusCode, body] = result;
        switch (statusCode) {
        case 200:
            renderMainPage(true);
            break;
        case 401:
            renderMainPage(false);
            break;
        case 429:
            renderServerError(body.error);
            break;
        default:
            console.log('undefined status code:', statusCode);
        }
    });
};

document.addEventListener('DOMContentLoaded', checkSession);

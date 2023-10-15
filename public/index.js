import './index.css'
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
    config.page = 'main';
};

/**
 *  Отрисовка страницы
 * @param {String} page Название страницы
 */
const renderPage = (page) => {
    pageObject.removeListeners();
    switch (page) {
    case 'login':
        pageObject = new LoginPage(root, config, changePage);
        break;
    case 'signup':
        pageObject = new SignupPage(root, config, changePage);
        break;
    default:
        break;
    }
    pageObject.render();
    config.page = page;
};

/**
 * Функция осуществляющая переход на нужную страницу
 * @param {String} href Путь к странице
 * @param {Boolean} isAuth статус авторизации
 */
const changePage = (href, isAuth) => {
    switch (href) {
    case 'main':
        if (config.page !== 'main') {
            renderMainPage(isAuth);
        }
        break;
    case 'login':
        if (config.page !== 'login') {
            renderPage('login');
        }
        break;
    case 'signup':
        if (config.page !== 'signup') {
            renderPage('signup');
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
 * @param {Event} event Событие нажатия по ссылке
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
    Ajax.prototype.getRequest(config.requests.checkSession).then((result) => {
        const [statusCode, body] = result;
        switch (statusCode) {
        case 200:
            renderMainPage(true);
            break;
        case 401:
            renderMainPage(false);
            break;
        case 429:
            renderServerError(body.error || 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    });
};

document.addEventListener('DOMContentLoaded', checkSession, {once: true});

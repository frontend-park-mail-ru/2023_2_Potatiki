import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import SignupPage from './src/pages/signup-page/signup-page.js';
import Ajax from './src/modules/ajax.js';
import renderServerError from './src/modules/server-error.js';
import {config} from './config.js';

const root = document.getElementById('root');

/**
 * Отрисовка главной страницы
 * @param {Boolean} isAuth Статус авторизации
 */
const renderMainPage = (isAuth) => {
    config.isAuthorized = isAuth;
    const main = new MainPage(root, config, changePage);
    main.render();
};

/**
 * Отрисовка страницы авторизации
 */
const renderLoginPage = () => {
    const login = new LoginPage(root, config, changePage);
    login.render();
};

/**
 * Отрисовка страницы регистрации
 */
const renderSignupPage = () => {
    const signup = new SignupPage(root, config, changePage);
    signup.render();
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
        config.page = 'main';
        break;
    case 'login':
        if (config.page !== 'login') {
            renderLoginPage();
            config.page = 'login';
        }
        config.page = 'login';
        break;
    case 'signup':
        if (config.page !== 'signup') {
            renderSignupPage();
            config.page = 'signup';
        }
        config.page = 'signup';
        break;
    case 'logout':
        renderMainPage(false);
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
            case 500:
                renderServerError(body.error);
                break;
            default:
                console.log('undefined status code:', statusCode);
        }
    });
};

document.addEventListener('DOMContentLoaded', checkSession);


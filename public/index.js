import './index.css';
import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import SignupPage from './src/pages/signup-page/signup-page.js';
import Ajax from './src/modules/ajax.js';
import renderServerError from './src/modules/server-error.js';
import {checkURL, config, loginROUTE, mainROUTE, signupROUTE} from './config.js';
import router from './src/modules/router';

/**
 * Listener для нажатий по ссылкам
 * @param {Event} event Событие нажатия по ссылке
 */
const listenClick = (event) => {
    event.preventDefault();
    const anchor = event.target.closest('a');
    if (!anchor) return;
    router.go({url: anchor.getAttribute('href')});
};

/**
 * Функция проверяет авторизован ли пользователь и
 * отображает соответствующий вид страницы
 */
const checkSession = () => {
    Ajax.prototype.getRequest(checkURL).then((result) => {
        const [statusCode, body] = result;
        switch (statusCode) {
        case 200:
            router.go({url: mainROUTE, param: {auth: true}});
            break;
        case 401:
            config.isAuthorized = false;
            router.go({url: mainROUTE, param: {auth: false}});
            break;
        case 429:
            renderServerError(body.error || 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    });
};

const root = document.getElementById('root');
// add logout
router.register({view: MainPage, url: mainROUTE, name: 'main'});
router.register({view: LoginPage, url: loginROUTE, name: 'login'});
router.register({view: SignupPage, url: signupROUTE, name: 'signup'});
router.start(root, config);
window.addEventListener('click', listenClick);
router.go({url: location.pathname});
// to action?
// document.addEventListener('DOMContentLoaded', checkSession, {once: true});

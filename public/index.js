import './index.css';
import MainPage from './src/pages/main-page/main-page.js';
import LoginPage from './src/pages/login-page/login-page.js';
import SignupPage from './src/pages/signup-page/signup-page.js';
import {loginROUTE, mainROUTE, signupROUTE} from './src/config/urls';
import router from './src/modules/router';
import { UserActions } from './src/actions/user';
import { eventEmmiter } from './src/modules/event-emmiter';
import { Events } from './src/config/events';

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

document.addEventListener('DOMContentLoaded', UserActions.start());
eventEmmiter.subscribe(Events.USER_IS_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.LOGOUT, router.go.bind(router));
const root = document.getElementById('root');
router.register({view: MainPage, url: mainROUTE, name: 'main'});
router.register({view: LoginPage, url: loginROUTE, name: 'login'});
router.register({view: SignupPage, url: signupROUTE, name: 'signup'});
router.start(root);
window.addEventListener('click', listenClick);

import MainPage from '../pages/main-page/main-page';
import {checkUrl, loginRoute, mainRoute, notFoundRoute, signupRoute} from '../../config';
import LoginPage from '../pages/login-page/login-page';
import SignupPage from '../pages/signup-page/signup-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import Ajax from './ajax';

/**
 * Класс роутера
 */
class Router {
    #history;
    #root;
    #states;
    #currentView;
    #config;
    #isAuth;

    /**
     * Конструктор для класса роутера
     */
    constructor() {
        this.#history = window.history;
    }

    /**
     * Добавление состояния для представления
     */
    register({name, url, view}) {
        this.#states.set(
            url,
            {name, url, state},
        );
    }

    /**
     * Запуск роутера
     * @param {Element} root Корневой компонент
     * @param {Object} config Конфиг для отрисовки представлений
     */
    start(root, config) {
        this.#root = root;
        this.#config = config;

        window.onpopstate = (event) => {
            this.go(event.state, true);
        };

        this.#states = new Map([
            [mainRoute, {view: MainPage, url: mainRoute, name: 'main'}],
            [signupRoute, {view: SignupPage, url: signupRoute, name: 'signup'}],
            [loginRoute, {view: LoginPage, url: loginRoute, name: 'login'}],
            [notFoundRoute, {view: NotFoundPage, url: notFoundRoute, name: 'not-found'}],
        ]);

        window.addEventListener('click', this.listenClick.bind(this));

        window.addEventListener('DOMContentLoaded', this.checkSession.bind(this));
    }

    /**
     * Listener для нажатий по ссылкам
     * @param {Object} event Событие нажатия по ссылке
     */
    listenClick(event) {
        event.preventDefault();
        const anchor = event.target.closest('a');
        if (!anchor) {
            return;
        }
        this.go({url: anchor.getAttribute('href')});
    };

    /**
     * Метод проверяет авторизован ли пользователь и
     * отображает соответствующий вид страницы
     */
    checkSession = () => {
        Ajax.prototype.getRequest(checkUrl).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                this.#isAuth = true;
                break;
            case 401:
                this.#isAuth = false;
                break;
            case 429:
                renderServerError(body.error);
                break;
            default:
                break;
            }
        });
    };

    /**
     * Метод осуществляющий переход на страницу
     * @param {Object} state Состояние представленя
     * @param {Boolean} replaceState Если true заменяем текущее состояние
     *                               иначе добавляем новое
     */
    go(state, replaceState) {
        if (!state.param) {
            state.param = {auth: this.#isAuth};
        }

        const baseState = this.#states.get(state.url);
        if (!baseState) {
            this.go({url: notFoundRoute});
            return;
        }
        if (this.#currentView?.removeListeners) {
            this.#currentView?.removeListeners();
        }
        this.#currentView = new baseState.view(this.#root, this.#config, state.param);
        this.#currentView.render();
        if (replaceState) {
            this.#history.replaceState(
                state,
                '',
                state.url,
            );
            return;
        }
        this.#history.pushState(
            state,
            '',
            state.url,
        );
    }

    /**
     * Переход назад по истории браузера
     */
    back() {
        this.#history.back();
    }

    /**
     * Переход вперед по истории браузера
     */
    forward() {
        this.#history.go();
    }
}

export default new Router();


import {loginRoute,
    notFoundRoute,
    signupRoute} from '../config/urls';

import {UserActions} from '../actions/user';


/**
 * Класс роутера
 */
class Router {
    #history;
    #root;
    #states;
    #currentView;
    #currentUrl;
    #continueUrl;

    /**
     * Конструктор для класса роутера
     */
    constructor() {
        this.#history = window.history;
        this.#states = new Map();
    }

    /**
     * Добавление состояния для представления
     */
    register({name, url, view}) {
        this.#states.set(
            url,
            {name, url, view},
        );
    }

    /**
     * Запуск роутера
     * @param {Element} root Корневой компонент
     */
    start(root) {
        this.#root = root;

        window.onpopstate = (event) => {
            this.go(event.state, true);
        };


        window.addEventListener('click', this.listenClick.bind(this));
    }

    /**
     * Listener для нажатий по ссылкам
     * @param {Event} event Событие нажатия по ссылке
     */
    listenClick(event) {
        const anchor = event.target.closest('a');
        if (!anchor) {
            return;
        }
        if (!anchor.getAttribute('href')) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        this.go({url: anchor.getAttribute('href')});
    };

    /**
     * Метод осуществляющий переход на страницу
     * @param {Object} state Состояние представленя
     * @param {Boolean} replaceState Если true заменяем текущее состояние
     *                               иначе добавляем новое
     */
    go(state, replaceState) {
        if (state.url === this.#currentUrl) {
            return;
        }
        let baseState = this.#states.get(state.url);
        if (state.url === signupRoute || state.url === loginRoute) {
            if (!state.continue &&
                !(this.#currentUrl === signupRoute || this.#currentUrl === loginRoute)) {
                state.continue = this.#currentUrl;
            }
            if (state.url === loginRoute) {
                this.#continueUrl = this.#currentUrl;
            }

            if (!state.continue) {
                state.continue = this.#continueUrl;
            }
        }
        let idParam;
        if (!baseState) {
            const urlWithoutParams = state.url.substring(0, state.url.lastIndexOf('/'));

            baseState = this.#states.get(urlWithoutParams);
            if (!baseState) {
                this.go({url: notFoundRoute});
                return;
            }
            idParam = state.url.substring(state.url.lastIndexOf('/') + 1);
        }

        if (this.#currentView) {
            if (this.#currentView.removeListeners) {
                this.#currentView.removeListeners();
            }
            if (this.#currentView.unsubscribeToEvents) {
                this.#currentView.unsubscribeToEvents();
            }
            UserActions.removeListeners();
        }


        if (replaceState) {
            this.#history.replaceState(
                state,
                '',
                state.url,
            );
        } else {
            this.#history.pushState(
                state,
                '',
                state.url,
            );
        }
        this.#currentUrl = state.url;
        this.#currentView = new baseState.view(this.#root, {continue: state.continue, idParam});
        document.title = baseState.name;
        this.#currentView.render();
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
        this.#history.forward();
    }
}

export default new Router();

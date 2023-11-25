import {notFoundRoute} from '../config/urls';
import {UserActions} from '../actions/user';
import CSATPage from '../pages/CSATPage/CSATPage';

/**
 * Класс роутера
 */
class Router {
    #history;
    #root;
    #states;
    #currentView;

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
            {name, url, view},
        );
    }

    /**
     * Запуск роутера
     * @param {Element} root Корневой компонент
     */
    start(root) {
        this.#root = root;

        console.log('start');
        // this.go({url: '/blank'}, true);
        window.onpopstate = (event) => {
            console.log('go call');
            this.go(event.state, true);
        };

        this.#states = new Map([
            ['/blank', {view: CSATPage, url: '/blank', name: 'blank'}],
        ]);

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
        let baseState = this.#states.get(state.url);
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

        this.#currentView = new baseState.view(this.#root, {continue: state.continue, idParam});
        this.#currentView.render();
        document.title = baseState.name;
        if (replaceState) {
            console.log('replace', state.url);
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
        this.#history.forward();
    }
}

export default new Router();

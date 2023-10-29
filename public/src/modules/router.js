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
        this.#states = [];
    }

    /**
     * Добавление состояния для представления
     * @param {String} name Название представления
     * @param {String} url Путь
     * @param {ObjectConstructor} view Представление
     */
    register({name, url, view}) {
        this.#states.push({
            name: name,
            url: url,
            view: view,
        });
    }

    /**
     * Запуск роутера
     * @param {Element} root Корневой компонент
     * @param {*} config Конфиг для отрисовки представлений
     */
    start(root) {
        this.#root = root;
        window.onpopstate = (event) => {
            this.go(event.state, true);
        };
    }

    /**
     * Метод осуществляющий переход на страницу
     * @param {Object} state Состояние представленя
     * @param {Boolean} replaceState Если true заменяем текущее состояние
     *                               иначе добавляем новое
     */
    go(state, replaceState) {
        console.log(state.url);
        const baseState = this.#states.find((s) => s.url === state.url);
        if (!baseState) {
            return;
        }
        
        this.#currentView?.removeListeners();
        this.#currentView?.unsubscribeToEvents();
        this.#currentView = new baseState.view(this.#root);
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

/**
 * Класс роутера
 */
class Router {
    #history;
    #root;
    #states;
    #currentView;
    #config;

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
    start(root, config) {
        this.#root = root;
        this.#config = config;
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
        const [baseUrl, param] = this.#splitUrl(state.url);
        if (param) {
            if (!state.param) {
                state.param = {};
            }
            state.param.queryParam = param;
        }
        const baseState = this.#states.find((s) => s.url === baseUrl);
        if (!baseState) {
            return;
        }
        this.#currentView?.removeListeners();
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

    /**
     * Выделение параметра из пути
     * @param {String} rawUrl Входной url
     * @return {[String, String]} Путь и выделенный параметр
     */
    #splitUrl(rawUrl) {
        if (rawUrl.substring(rawUrl.length - 1) !== '/') {
            return ([
                rawUrl.substring(0, rawUrl.length - rawUrl.lastIndexOf('/')),
                rawUrl.substring(rawUrl.length - rawUrl.lastIndexOf('/'))]
            );
        }
        return [rawUrl, ''];
    }
}

export default new Router();

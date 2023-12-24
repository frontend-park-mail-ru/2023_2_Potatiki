/**
 * Класс реализующий event emmiter
 */
class EventEmmiter {
    #events;

    /**
     * Конструктор класска
     */
    constructor() {
        this.#events = {};
    }

    /**
     * Функция, вызываемая при совершении события
     *@param {String} event Испускаемое событие
     *@param {...*} args Аргументы для функций, обрабытвающих событие
     */
    emit(event, ...args) {
        if (!(event in this.#events)) {
            return;
        }

        this.#events[event].forEach((listener) => listener.apply(this, args));
    }

    /**
     * Функция подписывающая события функциям
     *@param {String} event Событие, на которорое подписываются
     *@param {Function} handler Функция для подписки
     */
    subscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].add(handler);
            return;
        }

        this.#events[event] = new Set([handler]);
    }

    /**
     * Функция отписывающая события функциям
     *@param {String} event Событие, от которго отписываются
     *@param {Function} handler Функция для отписки
     */
    unsubscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].delete(handler);
        }
    }
}

export const eventEmmiter = new EventEmmiter();

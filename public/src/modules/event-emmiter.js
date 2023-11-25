/**
<<<<<<< HEAD
 * Класс реализующий event emmiter
=======
 *
>>>>>>> origin/main
 */
class EventEmmiter {
    #events;

    /**
<<<<<<< HEAD
     * Конструктор класска
=======
     *
>>>>>>> origin/main
     */
    constructor() {
        this.#events = {};
    }

    /**
<<<<<<< HEAD
     * Функция, вызываемая при совершении события
     *@param {String} event Испускаемое событие
     *@param {...*} args Аргументы для функций, обрабытвающих событие
=======
     *@param {String} event
     *@param {...*} args
>>>>>>> origin/main
     */
    emit(event, ...args) {
        if (!(event in this.#events)) {
            return;
        }

        this.#events[event].forEach((listener) => listener.apply(this, args));
    }

    /**
<<<<<<< HEAD
     * Функция подписывающая события функциям
     *@param {String} event Событие, на которорое подписываются
     *@param {Function} handler Функция для подписки
=======
     *@param {String} event
     *@param {Function} handler
>>>>>>> origin/main
     */
    subscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].add(handler);
            return;
        }

        this.#events[event] = new Set([handler]);
    }

    /**
<<<<<<< HEAD
     * Функция отписывающая события функциям
     *@param {String} event Событие, от которго отписываются
     *@param {Function} handler Функция для отписки
=======
     *@param {String} event
     *@param {Function} handler
>>>>>>> origin/main
     */
    unsubscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].delete(handler);
        }
    }
}

export const eventEmmiter = new EventEmmiter();

/**
 *
 */
class EventEmmiter {
    #events;

    /**
     *
     */
    constructor() {
        this.#events = {};
    }

    /**
     *@param {String} event
     *@param {...*} args
     */
    emit(event, ...args) {
        if (!(event in this.#events)) {
            return;
        }

        this.#events[event].forEach((listener) => listener.apply(this, args));
    }

    /**
     *@param {String} event
     *@param {Function} handler
     */
    subscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].add(handler);
            return;
        }

        this.#events[event] = new Set([handler]);
    }

    /**
     *@param {String} event
     *@param {Function} handler
     */
    unsubscribe(event, handler) {
        if (event in this.#events) {
            this.#events[event].delete(handler);
        }
    }
}

export const eventEmmiter = new EventEmmiter();

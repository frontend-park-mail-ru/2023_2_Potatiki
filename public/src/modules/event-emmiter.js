/**
 *
 */
class EventEmmiter {
    /**
     *
     */
    constructor() {
        this._events = {};
    }

    /**
     *@param {String} event
     *@param {...*} args
     */
    emit(event, ...args) {
        if (!(event in this._events)) {
            return;
        }
        if (typeof this._events[event] === 'object') {
            this._events[event].forEach((listener) => listener.apply(this, args));
        }
    }

    /**
     *@param {String} event
     *@param {Function} handler
     */
    subscribe(event, handler) {
        if (event in this._events) {
            this._events[event].push(handler);
            return;
        }

        this._events[event] = [handler];
    }

    /**
     *@param {String} event
     *@param {Function} handler
     */
    unsubscribe(event, handler) {
        if (event in this._events) {
            const idx = this._events[event].indexOf(handler);
            if (idx > -1) {
                this._events[event].splice(idx, 1);
            }
        }
    }
}

export const eventEmmiter = new EventEmmiter();

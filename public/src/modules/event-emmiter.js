
class EventEmmiter{

    constructor() {
        this._events = {};
    }

    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            this._events[event].forEach(listener => listener.apply(this, args));
        }
    }

    subscribe(event, handler) {
        this._events[event].push(handler);
    }

    unsubscribe(event, handler) {
        this._events[event].push(handler);
    }
}

export const eventEmmiter = new EventEmmiter();


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
        const idx = this._events[event].indexOf(handler);
        if (idx > -1) {
          this._events[event].splice(idx, 1);
        }
    }
}

export const eventEmmiter = new EventEmmiter();

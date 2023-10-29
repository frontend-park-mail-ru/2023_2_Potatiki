
class EventEmmiter{

    constructor() {
        this._events = {};
    }

    emit(event, ...args) {
        if (!(event in this._events)) {
            return;
        }
        if (typeof this._events[event] === 'object') {
            this._events[event].forEach(listener => listener.apply(this, args));
        }
    }

    subscribe(event, handler) {
        if(event in this._events) {
            this._events[event].push(handler);
            return;
        }

        this._events[event] = [handler];
    }

    unsubscribe(event, handler) {
        if(event in this._events) {
            const idx = this._events[event].indexOf(handler);
            if (idx > -1) {
              this._events[event].splice(idx, 1);
            }
        }
    }
}

export const eventEmmiter = new EventEmmiter();

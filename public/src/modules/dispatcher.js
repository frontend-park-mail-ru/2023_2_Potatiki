
class Dispatcher {
    _callbacks
    _isDispatching

    constructor(){
        this._callbacks = [];
    }

    register(callback) {
        this._callbacks.push(callback);
    }

    dispatch(action) {
        for(let ind in this._callbacks) {
            this._callbacks[ind](action);
        }
    }
}

export const AppDispatcher = new Dispatcher();

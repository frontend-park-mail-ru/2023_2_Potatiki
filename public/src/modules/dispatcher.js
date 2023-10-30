/**
 *
 */
class Dispatcher {
    _callbacks;
    _isDispatching;

    /**
     *
     */
    constructor() {
        this._callbacks = [];
    }

    /**
     *@param {Function} callback
     */
    register(callback) {
        this._callbacks.push(callback);
    }

    /**
     *@param {Object} action
     */
    dispatch(action) {
        for (const ind in this._callbacks) {
            if (typeof this._callbacks[ind] === 'function') {
                this._callbacks[ind](action);
            }
        }
    }
}

export const AppDispatcher = new Dispatcher();

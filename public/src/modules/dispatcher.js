/**
 *
 */
class Dispatcher {
    #callbacks;
    #isDispatching;

    /**
     *
     */
    constructor() {
        this.#callbacks = [];
    }

    /**
     *@param {Function} callback
     */
    register(callback) {
        this.#callbacks.push(callback);
    }

    /**
     *@param {Object} action
     */
    dispatch(action) {
        this.#callbacks.forEach((callback) => {
            callback(action);
        });
    }
}

export const AppDispatcher = new Dispatcher();

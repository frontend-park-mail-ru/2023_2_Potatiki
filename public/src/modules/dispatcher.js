/**
<<<<<<< HEAD
 * Класс, реализующий функцию Dispatcher во Flux
 */
class Dispatcher {
    #callbacks;

    /**
     * Конструктор класса
=======
 *
 */
class Dispatcher {
    #callbacks;
    #isDispatching;

    /**
     *
>>>>>>> origin/main
     */
    constructor() {
        this.#callbacks = [];
    }

    /**
<<<<<<< HEAD
     * Функция регистрирующая функции Store
     *@param {Function} callback Функция для обработки событий
=======
     *@param {Function} callback
>>>>>>> origin/main
     */
    register(callback) {
        this.#callbacks.push(callback);
    }

    /**
<<<<<<< HEAD
     * Вызов обработки события у всех зарегестрированных Store
     *@param {Object} action Событие, которое вызывается
=======
     *@param {Object} action
>>>>>>> origin/main
     */
    dispatch(action) {
        this.#callbacks.forEach((callback) => {
            callback(action);
        });
    }
}

export const AppDispatcher = new Dispatcher();

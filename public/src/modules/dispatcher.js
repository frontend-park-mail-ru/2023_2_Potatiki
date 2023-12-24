/**
 * Класс, реализующий функцию Dispatcher во Flux
 */
class Dispatcher {
    #callbacks;

    /**
     * Конструктор класса
     */
    constructor() {
        this.#callbacks = [];
    }

    /**
     * Функция регистрирующая функции Store
     *@param {Function} callback Функция для обработки событий
     */
    register(callback) {
        this.#callbacks.push(callback);
    }

    /**
     * Вызов обработки события у всех зарегестрированных Store
     *@param {Object} action Событие, которое вызывается
     */
    dispatch(action) {
        this.#callbacks.forEach((callback) => {
            callback(action);
        });
    }
}

export const AppDispatcher = new Dispatcher();

import WS from '../modules/ws';

/**
 *
 */
class NotificationStore {
    #state = {
        notifications: [],
    };

    /**
     * Конструктор
     */
    constructor() {
    }

    /**
     * Получение
     */
    get notifications() {
        return this.#state.notifications;
    }

    /**
     *
     * @param {Object} message
     */
    addNotification(message) {
        console.log(message);
    }

    addNotification = this.addNotification.bind(this);

    /**
     *
     */
    connectWS() {
        const ws = new WS(this.addNotification);
    }
}

export const notificationStore = new NotificationStore();

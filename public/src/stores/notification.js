import { Events } from '../config/events';
import { eventEmmiter } from '../modules/event-emmiter';
import WS from '../modules/ws';

/**
 *
 */
class NotificationStore {
    #state = {
        notifications: [],
    };

    #ws;
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
        this.notifications.push(message);
        eventEmmiter.emit(Events.RECIEVE_NOTIFICATION);
    }

    addNotification = this.addNotification.bind(this);

    /**
     *
     */
    connectWS() {
        this.#ws = new WS(this.addNotification);
        this.#ws.keepAlive();
    }

    /**
     *
     */
    disconnectWS() {
        this.#ws.closeSocket();
    }
}

export const notificationStore = new NotificationStore();

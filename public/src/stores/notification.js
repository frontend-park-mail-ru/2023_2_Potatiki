import {Events} from '../config/events';
import {eventEmmiter} from '../modules/event-emmiter';
import WS from '../modules/ws';
import {userStore} from './user';

/**
 *
 */
class NotificationStore {
    #state = {
        notifications: [],
        isUnread: false,
    };

    #ws;
    /**
     * Конструктор
     */
    constructor() {
        console.log(localStorage.getItem('notification-info'));
    }

    /**
     * Получение
     */
    get notifications() {
        return this.#state.notifications;
    }

    /**
     *
     */
    addLocalNotifiacation() {
        let localNotifications = JSON.parse(localStorage.getItem('notification-info'));
        if (!localNotifications) {
            localNotifications = this.#state;
            localStorage.setItem('notification-info', JSON.stringify(localNotifications));
        }

        localNotifications.notifications.push(message);
        localStorage.setItem('notification-info', JSON.stringify(localNotifications));
    }

    /**
     *
     * @param {Object} message
     */
    addNotification(message) {
        this.#state.notifications.push(message);
        this.#state.isUnread = true;
        eventEmmiter.emit(Events.RECIEVE_NOTIFICATION);
        this.addLocalNotifiacation(message);
    }

    /**
     *
     */
    deleteNotifications() {
        this.#state.notifications = [];
        this.#state.isUnread = false;
        eventEmmiter.emit(Events.CLEAN_NOTIFICATIONS);
    }

    addNotification = this.addNotification.bind(this);
    deleteNotifications = this.deleteNotifications.bind(this);

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
        // this.#ws.closeSocket();
    }
}

export const notificationStore = new NotificationStore();

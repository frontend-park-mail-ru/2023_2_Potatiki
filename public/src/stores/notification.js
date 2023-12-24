import {Events} from '../config/events';
import { getRecentNotifications } from '../config/urls';
import {eventEmmiter} from '../modules/event-emmiter';
import WS from '../modules/ws';

/**
 * Класс хранилище уведомлений
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
        this.#state = JSON.parse(localStorage.getItem('notification-info'));
        if (!this.#state) {
            this.#state = {
                notifications: [],
                isUnread: false,
            };
        }
    }

    /**
     * Получение уведомлений
     */
    get notifications() {
        return this.#state.notifications;
    }

    /**
     * Получения флага о прочитанности уведомлений
     */
    get isUnread() {
        return this.#state.isUnread;
    }

    /**
     * Синхронизация local storage с хранилицем уведомлений
     */
    syncLocalNotifiacation() {
        const localNotifications = this.#state;
        localStorage.setItem('notification-info', JSON.stringify(localNotifications));
        localStorage.setItem('notification-info', JSON.stringify(localNotifications));
    }

    /**
     * Обработка нового уведомления
     * @param {Object} message Полученное сообщений
     */
    addNotification(message) {
        this.#state.notifications.push(message);
        this.#state.isUnread = true;
        eventEmmiter.emit(Events.RECIEVE_NOTIFICATION);
        this.syncLocalNotifiacation();
    }

    /**
     * Прочитано уведомления
     */
    readNotifications() {
        this.#state.isUnread = false;
        this.syncLocalNotifiacation();
    }

    /**
     * Взятие уведомлений с сервера
     */
    async getNotifications() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getRecentNotifications);

        if (statusCode === 200) {
            this.#state.notifications = body;
            this.#state.isUnread = false;
            this.syncLocalNotifiacation();
        }
    }

    /**
     * Удаление уведомлений
     */
    deleteNotifications() {
        this.#state.notifications = [];
        this.#state.isUnread = false;
        eventEmmiter.emit(Events.CLEAN_NOTIFICATIONS);
        this.syncLocalNotifiacation();
    }

    addNotification = this.addNotification.bind(this);
    deleteNotifications = this.deleteNotifications.bind(this);

    /**
     * Открытие web socket
     */
    connectWS() {
        this.#ws = new WS(this.addNotification);
        this.#ws.keepAlive();
    }

    /**
     * Закрытие web socket
     */
    disconnectWS() {
        this.#ws.closeSocket();
    }
}

export const notificationStore = new NotificationStore();

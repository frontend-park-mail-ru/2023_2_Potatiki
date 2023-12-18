import WS from '../modules/ws';

/**
 *
 */
class NotificationStore {
    #state = {
        notifications: [{text: 'Ваш заказ доставлен'},
            {text: 'Специально для вас промокод NEW25 скидка 25%'}],
    };

    /**
     * Конструктора
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
     */
    connectWS() {
        const ws = new WS();
    }
}

export const notificationStore = new NotificationStore();

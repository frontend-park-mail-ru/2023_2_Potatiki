import './notification.scss';
import template from './notification.hbs';
import Button from '../button/button';
import {eventEmmiter} from '../../modules/event-emmiter';
import {Events} from '../../config/events';
import NotificationWindow from '../notificationWindow/notificationWindow';
import {notificationStore} from '../../stores/notification';

/**
 * Класс компонента уведомлений
 */
export default class Notification {
    #parent;
    #config;

    notificationWindow;

    /**
   * Конструктор класса уведомлений
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
     * Смена состояния иконки уведомления
     */
    changeIconState() {
        if (notificationStore.isUnread) {
            document.querySelector('.notification__icon')?.classList.
                document.querySelector('.notification__icon')?.classList.
                toggle('notification__icon_active');
            add('notification__icon_active');
        } else {
            document.querySelector('.notification__icon')?.classList.
                remove('notification__icon_active');
        }
    }

    /**
     * Отрисовка окна с уведомлениями
     * @param {Event} event
     */
    renderNotificationWindow(event) {
        event.stopPropagation();
        notificationStore.readNotifications();
        this.changeIconState();
        this.notificationWindow = new NotificationWindow(
            document.querySelector('.notification__window-container'));
        this.notificationWindow.render();
        document.querySelector('.notification__icon').removeEventListener('click',
            this.renderNotificationWindow);
        document.addEventListener('click',
            this.hideNotificationWindow);
        document.querySelector('.notification__window-container').addEventListener('click',
            (event)=>event.stopPropagation());
    }

    /**
     * Скрытие окна уведомлений
     * @param {Event} event
     */
    hideNotificationWindow(event) {
        this.notificationWindow.hide();
        this.notificationWindow = undefined;
        document.removeEventListener('click',
            this.hideNotificationWindow);
        document.querySelector('.notification__icon').addEventListener('click',
            this.renderNotificationWindow);
    }

    /**
     * Обработка принятия уведомлений
     */
    receiveNotification() {
        if (this.notificationWindow) {
            notificationStore.readNotifications();
            this.notificationWindow.render();
        } else {
            this.changeIconState();
        }
    }

    /**
     * Обработка очистки уведомлений
     */
    cleanNotifications() {
        this.changeIconState();
    }

    changeIconState = this.changeIconState.bind(this);
    receiveNotification = this.receiveNotification.bind(this);
    cleanNotifications = this.cleanNotifications.bind(this);
    renderNotificationWindow = this.renderNotificationWindow.bind(this);
    hideNotificationWindow = this.hideNotificationWindow.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.RECIEVE_NOTIFICATION, this.receiveNotification);
        eventEmmiter.subscribe(Events.CLEAN_NOTIFICATIONS, this.cleanNotifications);
    }

    /**
     * Добавление листенеров
     */
    addEventListeners() {
        document.querySelector('.notification__icon').addEventListener('click',
            this.renderNotificationWindow);
    }

    /**
   * Отрисовка компонента уведомдений
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(),
        );

        const icon = new Button(
            document.querySelector('.notification__icon'),
            this.#config,
            true,
        );
        icon.render();

        this.changeIconState();

        this.subscribeToEvents();
        this.addEventListeners();
    }
}

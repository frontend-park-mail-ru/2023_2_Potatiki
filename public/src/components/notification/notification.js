import './notification.scss';
import template from './notification.hbs';
import Button from '../button/button';
import {eventEmmiter} from '../../modules/event-emmiter';
import {Events} from '../../config/events';
import NotificationWindow from '../notificationWindow/notificationWindow';

// TO DO подправить верстку иконой

/**
 * Класс компонента уведомлений
 */
export default class Notification {
    #parent;
    #config;

    isUnread;
    notificationWindow;

    /**
   * Конструктор класса ссылки
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.isUnread = false;
    }

    /**
     *
     */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
     *
     */
    changeIconState() {
        if (this.isUnread) {
            document.querySelector('.notification__icon').classList.
                add('notification__icon_active');
        } else {
            document.querySelector('.notification__icon').classList.
                remove('notification__icon_active');
        }
    }

    /**
     *
     */
    renderNotificationWindow() {
        this.isUnread = false;
        this.changeIconState();
        this.notificationWindow = new NotificationWindow(
            document.querySelector('.notification__window-container'));
        this.notificationWindow.render();
        document.querySelector('.notification__icon').addEventListener('click',
            this.hideNotificationWindow);
        document.querySelector('.notification__icon').removeEventListener('click',
            this.renderNotificationWindow);
    }

    /**
     *
     */
    hideNotificationWindow() {
        this.notificationWindow.hide();
        document.querySelector('.notification__icon').removeEventListener('click',
            this.hideNotificationWindow);
        document.querySelector('.notification__icon').addEventListener('click',
            this.renderNotificationWindow);
    }

    /**
     *
     */
    receiveNotification() {
        this.isUnread = true;
        this.changeIconState();
    }

    changeIconState = this.changeIconState.bind(this);
    receiveNotification = this.receiveNotification.bind(this);
    renderNotificationWindow = this.renderNotificationWindow.bind(this);
    hideNotificationWindow = this.hideNotificationWindow.bind(this);

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.RECIEVE_NOTIFICATION, this.receiveNotification);
    }

    /**
     *
     */
    addEventListeners() {
        document.addEventListener('click', this.renderNotificationWindow);
    }

    /**
   * Отрисовка компонента ссылки
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

        if (this.isUnread) {
            this.changeIconState();
        }

        // this.subscribeToEvents();
        this.addEventListeners();
    }
}

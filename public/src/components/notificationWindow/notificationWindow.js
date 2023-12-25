import './notificationWindow.scss';
import template from './notificationWindow.hbs';
import {notificationStore} from '../../stores/notification';


/**
 * Класс компонента окна уведомлений
 */
export default class NotificationWindow {
    #parent;
    #config;


    /**
   * Конструктор класса ссылки
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }


    /**
   * Отрисовка компонента окна уведомлений
   */
    render() {
        this.#parent.innerHTML = template({notifications:
            notificationStore.notifications.reverse()});
    }

    /**
     * Скрытие окна уведомлений
     */
    hide() {
        this.#parent.innerHTML = '';
    }
}

import './notificationWindow.scss';
import template from './notificationWindow.hbs';
import {notificationStore} from '../../stores/notification';


// TO DO подправить верстку иконой

/**
 * Класс компонента уведомлений
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
   * Отрисовка компонента ссылки
   */
    render() {
        console.log('render window');
        this.#parent.innerHTML = template({notifications: notificationStore.notifications});
    }

    /**
     *
     */
    hide() {
        console.log('hide window');
        this.#parent.innerHTML = '';
    }
}

import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
import template from './iframe.hbs';
import './iframe.scss';

/**
 * Класс компонента iframe
 */
export default class IFrame {
    #parent;
    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки
     */
    constructor() {
        this.#parent = document.querySelector('body');
        this.#config = {};
    }

    /**
     * Закрытие компонента
     */
    remove() {
        this.unsubscribeToEvents();
        document.getElementById('csat-iframe').remove();
    }

    remove = this.remove.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CLOSE_IFRAME, this.remove);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CLOSE_IFRAME, this.remove);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        console.log(template(this.#config), this.#parent);
        this.#parent.insertAdjacentHTML('beforeend', template(this.#config));
    }
}

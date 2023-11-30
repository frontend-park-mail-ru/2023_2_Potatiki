import Link from '../link/link.js';
import template from './info-row.hbs';
import './info-row.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

/**
 * Класс компонента строчки карточки информации
 */
export default class InfoRow {
    #parent;
    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Взятие элемента компонента строчки
     */
    get self() {
        return this.#parent.querySelector(`#${this.#config.id}`);
    }

    /**
     * Обновление строчки
     * @param {Object} data Данные для обновления строчки
     */
    updateInfoRow(data) {
        if (data.profile) {
            self.querySelector(`.name`).textContent = data.profile.login;
            self.querySelector(`.value`).textContent = data.profile.phone;
        }
    }

    updateInfoRow = this.updateInfoRow.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_INFO_ROW, this.updateInfoRow);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_INFO_ROW, this.updateInfoRow);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const img = new Link(
            this.self.querySelector('.info-row__name-container'),
            this.#config.img,
            true,
        );
        img.render();

        this.subscribeToEvents();
    }
}

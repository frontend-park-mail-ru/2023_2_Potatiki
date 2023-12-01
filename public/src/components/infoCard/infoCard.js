import './infoCard.scss';
import {userStore} from '../../stores/user';
import template from './infoCard.hbs';
import {config} from '../../../config';

/**
 * Класс карточки личной информации
 */
export default class InfoCard {
    #parent;
    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительсктй компонент
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.infoCard;
        this.#config.login = userStore.loginName;
        this.#config.number = userStore.number;
        this.#config.imgSrc = userStore.imgSrc;
    }

    /**
     * Добавление листенеров
     */
    addEventListeners() {

    }

    /**
     * Подписка на событие
     */
    subscribeToEvents() {

    }

    /**
     * Удаление листенеров
     */
    removeEventListeners() {

    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Отрисовка компонента карточки
     */
    render() {
        this.#parent.innerHTML = template(this.#config);
    }
}

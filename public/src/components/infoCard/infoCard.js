import './infoCard.scss';
import {userStore} from '../../stores/user';
import template from './infoCard.hbs';
import {config} from '../../../config';

/**
<<<<<<< HEAD
 * Класс карточки личной информации
=======
 *
>>>>>>> origin/main
 */
export default class InfoCard {
    #parent;
    #config;

    /**
<<<<<<< HEAD
     * Конструктор класса
     * @param {*} parent Родительсктй компонент
=======
     *
     * @param {*} parent
>>>>>>> origin/main
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.infoCard;
        this.#config.login = userStore.loginName;
        this.#config.number = userStore.number;
        this.#config.imgSrc = userStore.imgSrc;
    }

    /**
<<<<<<< HEAD
     * Добавление листенеров
=======
     *
>>>>>>> origin/main
     */
    addEventListeners() {

    }

    /**
<<<<<<< HEAD
     * Подписка на событие
=======
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {

    }

    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
     */
    removeEventListeners() {

    }

    /**
<<<<<<< HEAD
     * Отписка от событий
=======
     *
>>>>>>> origin/main
     */
    unsubscribeToEvents() {

    }

    /**
<<<<<<< HEAD
     * Отрисовка компонента карточки
=======
     *
>>>>>>> origin/main
     */
    render() {
        this.#parent.innerHTML = template(this.#config);
    }
}

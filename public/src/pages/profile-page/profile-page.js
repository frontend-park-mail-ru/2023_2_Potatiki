import './profile-page.scss';
import template from './profile-page.hbs';
import Profile from '../../components/profile/profile';
import {header} from '../../components/header/header.js';
import {config} from '../../../config.js';
import {userStore} from '../../stores/user.js';
import router from '../../modules/router.js';
import {loginRoute} from '../../config/urls.js';
import {renderServerMessage} from '../../modules/server-message.js';

/**
 * Класс страницы профиля
 */
export default class ProfilePage {
    #parent;

    profile;

    /**
     * Конструктор класса страницы
     *@param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('profile-page');
    }

    /**
     * Добавление листенеров
     */
    addEventListeners() {

    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {

    }

    /**
     * Удаление листенеров
     */
    removeListeners() {

    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Перенапрвление на страницу авторизации
     */
    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть профиль');
    }

    /**
     * Отрисовка страницы профиля
     */
    render() {
        this.#parent.innerHTML = template(config.profilePage);

        if (!userStore.isAuth) {
            this.redirectToLogin();
            return;
        }

        header.render();

        this.profile = new Profile(document.getElementById('profile__card'));
        this.profile.render();
    }
}

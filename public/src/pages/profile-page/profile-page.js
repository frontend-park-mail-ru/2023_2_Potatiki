import './profile-page.scss';
import template from './profile-page.hbs';
import Profile from '../../components/profile/profile';
import Header from '../../components/header/header';
import {config} from '../../../config.js';
import {userStore} from '../../stores/user.js';
import router from '../../modules/router.js';
import {loginRoute} from '../../config/urls.js';
import {renderServerMessage} from '../../modules/server-message.js';

/**
<<<<<<< HEAD
 * Класс страницы профиля
 */
export default class ProfilePage {
    #parent;

    profile;

    /**
     * Конструктор класса страницы
=======
 *
 */
export default class ProfilePage {
    #parent;
    profile;

    /**
     *
>>>>>>> origin/main
     *@param {*} parent
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
     * Подписка на события
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

<<<<<<< HEAD
    /**
     * Перенапрвление на страницу авторизации
     */
=======
>>>>>>> origin/main
    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть профиль');
    }

    /**
<<<<<<< HEAD
     * Отрисовка страницы профиля
=======
     *
>>>>>>> origin/main
     */
    render() {
        this.#parent.innerHTML = template(config.profilePage);

        if (!userStore.isAuth) {
            this.redirectToLogin();
            return;
        }

        const header = new Header();
        header.render();

        this.profile = new Profile(document.getElementById('profile__card'));
        this.profile.render();
    }
}

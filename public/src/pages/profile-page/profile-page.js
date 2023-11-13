import template from './profile-page.hbs';
import Profile from '../../components/profile/profile';
import Header from '../../components/header/header';
import {config} from '../../../config.js';
import {userStore} from '../../stores/user.js';
import router from '../../modules/router.js';
import {loginRoute} from '../../config/urls.js';
import {renderServerMessage} from '../../modules/server-message.js';

/**
 *
 */
export default class ProfilePage {
    #parent;
    profile;

    /**
     *
     *@param {*} parent
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.querySelector('#profile-page');
    }

    /**
     *
     */
    addEventListeners() {

    }

    /**
     *
     */
    subscribeToEvents() {

    }

    /**
     *
     */
    removeEventListeners() {

    }

    /**
     *
     */
    unsubscribeToEvents() {

    }

    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть профиль');
    }

    /**
     *
     */
    render() {
        this.#parent.innerHTML = template(config.profilePage);

        if (!userStore.isAuth) {
            this.redirectToLogin();
            return;
        }

        const header = new Header();
        header.render();

        this.profile = new Profile(document.querySelector('#profile__card'));
        this.profile.render();
    }
}

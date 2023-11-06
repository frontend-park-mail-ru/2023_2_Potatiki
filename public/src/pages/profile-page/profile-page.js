import template from './profile-page.hbs';
import Profile from '../../components/profile/profile';
import Header from '../../components/header/header';
import {config} from '../../../config.js';

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

    /**
     *
     */
    render() {
        this.#parent.innerHTML = template(config.profilePage);

        const header = new Header(document.querySelector('#profile-header'));
        header.render();

        this.profile = new Profile(document.querySelector('#profile__card'));
        this.profile.render();
    }
}

import './profileMenu.scss';
import template from './profileMenu.hbs';
import {UserActions} from '../../actions/user';

// TO DO: вынести в конфиг наполнение меню

/**
 * Компонент меню профиля
 */
export default class ProfileMenu {
    #parent;

    /**
     *
     * @param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector('.profile-menu-container');
    }

    /**
     *
     */
    logoutHandle(event) {
        event.preventDefault();
        UserActions.logout();
    }

    /**
     *
     */
    addEventListeners() {
        document.getElementById('logout-menu-elem').addEventListener(this.logoutHandle);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(),
        );
    }
}

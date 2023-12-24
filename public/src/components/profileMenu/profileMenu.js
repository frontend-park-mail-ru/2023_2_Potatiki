import './profileMenu.scss';
import template from './profileMenu.hbs';
import {UserActions} from '../../actions/user';
import Link from '../link/link';

// TO DO: вынести в конфиг наполнение меню

/**
 * Компонент меню профиля
 */
export default class ProfileMenu {
    #parent;
    #config;

    /**
     *
     * @param {Element} parent Родительский элемент
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
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

        // event.preventDefault();
        // UserActions.logout();
    }

    /**
     *
     */
    addEventListeners() {
        document.getElementById('logout-menu-elem').addEventListener('click', this.logoutHandle);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(),
        );

        const icon = new Link(
            document.querySelector('.profile-menu__icon'),
            this.#config,
            true,
        );
        icon.render();

        this.addEventListeners();
    }
}

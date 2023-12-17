import './profileMenu.scss';
import template from './profileMenu.hbs';

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
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(),
        );
    }
}

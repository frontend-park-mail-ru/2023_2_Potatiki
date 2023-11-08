import {userStore} from '../../stores/user';
import template from './infoCard.hbs';
import {config} from '../../../config';

/**
 *
 */
export default class InfoCard {
    #parent;
    #config;

    /**
     *
     * @param {*} parent
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.profilePage.profile.infoCard;
        this.#config.login = userStore.loginName;
        this.#config.number = userStore.number;
        this.#config.imgSrc = userStore.imgSrc;
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
        this.#parent.innerHTML = template(this.#config);
    }
}

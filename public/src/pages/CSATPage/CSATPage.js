import template from './CSATPage.hbs';
import './CSATPage.scss';

/**
 * Класс страницы CSAT опроса
 */
export default class CSATPage {
    #parent;

    constructor(parent) {
        console.log('CSAT');
        this.#parent = parent;
    }


    render() {
        this.#parent.innerHTML = template();
        console.log(template());
    }
}
import CsatForm from '../../components/csatForm/csat-form';
import template from './CSATPage.hbs';
import './CSATPage.scss';

/**
 * Класс страницы CSAT опроса
 */
export default class CSATPage {
    #parent;

    form;

    constructor(parent) {
        console.log('CSAT');
        this.#parent = parent;
    }


    render() {
        this.#parent.innerHTML = template();
        console.log(template());

        this.form = new CsatForm(document.querySelector('.container-form'), 'Оцените');
        this.form.render();
    }
}
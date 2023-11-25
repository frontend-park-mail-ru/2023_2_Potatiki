import {CsatActions} from '../../actions/csat';
import CsatForm from '../../components/csatForm/csat-form';
import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
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

    renderForm(data) {
        this.form = new CsatForm(document.querySelector('.container-form'), 'Оцените наш сайт', data);
        this.form.render();
    }

    renderForm = this.renderForm.bind(this);


    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.QUESTIONS, this.renderForm);
    }

    /**
    * Отписка от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.QUESTIONS, this.renderForm);
    }


    render() {
        this.#parent.innerHTML = template();
        // console.log(template());
        this.subscribeToEvents();
        CsatActions.getQuestions();
    }
}

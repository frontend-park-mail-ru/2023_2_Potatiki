import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
import template from './staticPage.hbs';
import {StaticActions} from '../../actions/static';
import './staticPage.scss';

/**
 * Класс страницы статистики
 */
export default class StaticPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
        // this.#rows = [{questionName: 'kf', statValue: '3'}, {questionName: 'kf', statValue: '3'}, {questionName: 'kf', statValue: '3'}];
    }


    renderStatic(rows) {
        this.#parent.innerHTML = template({rows});
    }

    renderStatic = this.renderStatic.bind(this);

    render() {
        StaticActions.getSattic(1);
        eventEmmiter.subscribe(Events.SUCCESS_GET_STATIC, this.renderStatic)
    }
}

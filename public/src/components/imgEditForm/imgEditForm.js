import './imgEditForm.scss';
import Button from '../button/button.js';
import template from './imgEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {userStore} from '../../stores/user.js';


/**
 * Класс формы авторизации
 */
export default class ImgEditForm {
    #parent;

    #config;

    img;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     *
     */
    get self() {
        return document.querySelector('#img-edit-form');
    }

    /**
     *
     * @param {Evnt} event
     */
    submitHandle(event) {
        event.preventDefault();
        const imgInput = document.querySelector('#img-edit');
        const imgFile = imgInput.files[0];
        if (imgFile) {
            UserActions.updateImg(imgFile);
        } else {
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_IMG);
        }
    }

    submitHandle = this.submitHandle.bind(this);

    upload(){
        const [file] = document.querySelector('#img-edit').files;
        if (file) {
            document.querySelector('#upload').src = URL.createObjectURL(file)
        }
    }

    renderError() {
    }

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        document.querySelector('#img-edit').addEventListener('change', this.upload);
    }


    /**
     *
     */
    subscribeToEvents() {
    }

    /**
     *
     */
    unsubscribeToEvents() {

    }

    /**
     *
     */
    removeListeners() {
    }

    /**
   * Отрисовка компонента формы авторизации
   */
    render() {
        this.#parent.innerHTML = template({imgSrc: userStore.imgSrc});

        this.submit = new Button(this.self, {class: 'img-edit-form__submit',
            id: 'img-edit-button', text: 'Сохранить'});
        this.submit.render();


        this.addListeners();
        this.subscribeToEvents();
    }
}

import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './imgEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {config} from '../../../config.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';


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
        // this.#config = config.profilePage.profile.numberEditForm;
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
            this.renderError();
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
        // eventEmmiter.subscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);
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
        // this.submit.self.removeEventListener('click', this.submitHandle);
    }

    /**
   * Отрисовка компонента формы авторизации
   */
    render() {
        this.#parent.innerHTML = template(this.#config);

        this.submit = new Button(this.self, config.profilePage.profile.numberEditForm.submit);
        this.submit.render();


        this.addListeners();
        this.subscribeToEvents();
    }
}

import './imgEditForm.scss';
import Button from '../button/button.js';
import template from './imgEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {userStore} from '../../stores/user.js';


/**
 * Класс формы обновление аватарки
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
     * Взятие элемента компонента
     */
    get self() {
        return document.getElementById('img-edit-form');
    }

    /**
     * Функция обработки события отправки формы
     * @param {Evnt} event Событие нажатие на кнопки отправки формы
     */
    submitHandle(event) {
        event.preventDefault();
        const imgInput = document.getElementById('img-edit');
        const imgFile = imgInput.files[0];
        if (imgFile) {
            UserActions.updateImg(imgFile);
        } else {
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_IMG);
        }
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     * Отображение загруженного изображения
     */
    upload() {
        const [file] = document.getElementById('img-edit').files;
        if (file) {
            document.getElementById('upload').src = URL.createObjectURL(file);
        }
    }

    /**
     * Отрисовка ошибок при загрузке изображения
     */
    renderError() {
    }

    /**
     * Добавление листенеров
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        document.getElementById('img-edit').addEventListener('change', this.upload);
    }


    /**
     * Подписка на события
     */
    subscribeToEvents() {
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Удаление листенеров
     */
    removeListeners() {
    }

    /**
   * Отрисовка компонента формы обновления аватарки
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

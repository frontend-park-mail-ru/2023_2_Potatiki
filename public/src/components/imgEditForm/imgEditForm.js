import './imgEditForm.scss';
import Button from '../button/button.js';
import template from './imgEditForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {userStore} from '../../stores/user.js';


/**
<<<<<<< HEAD
 * Класс формы обновление аватарки
 */
export default class ImgEditForm {
    #parent;
    #config;

    img;
=======
 * Класс формы авторизации
 */
export default class ImgEditForm {
    #parent;

    #config;

    img;

>>>>>>> origin/main
    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
<<<<<<< HEAD
     * Взятие элемента компонента
=======
     *
>>>>>>> origin/main
     */
    get self() {
        return document.getElementById('img-edit-form');
    }

    /**
<<<<<<< HEAD
     * Функция обработки события отправки формы
     * @param {Evnt} event Событие нажатие на кнопки отправки формы
=======
     *
     * @param {Evnt} event
>>>>>>> origin/main
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

<<<<<<< HEAD
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
=======
    upload(){
        const [file] = document.getElementById('img-edit').files;
        if (file) {
            document.getElementById('upload').src = URL.createObjectURL(file)
        }
    }

>>>>>>> origin/main
    renderError() {
    }

    /**
<<<<<<< HEAD
     * Добавление листенеров
=======
     *
>>>>>>> origin/main
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        document.getElementById('img-edit').addEventListener('change', this.upload);
    }


    /**
<<<<<<< HEAD
     * Подписка на события
=======
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {
    }

    /**
<<<<<<< HEAD
     * Отписка от событий
=======
     *
>>>>>>> origin/main
     */
    unsubscribeToEvents() {

    }

    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
     */
    removeListeners() {
    }

    /**
<<<<<<< HEAD
   * Отрисовка компонента формы обновления аватарки
=======
   * Отрисовка компонента формы авторизации
>>>>>>> origin/main
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

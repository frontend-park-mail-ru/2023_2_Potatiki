import './profile.scss';
import template from './profile.hbs';
import InfoCard from '../infoCard/infoCard';
import NumberEditForm from '../numberEditForm/numberEditForm';
import PasswordEditForm from '../passwordEditForm/passwordEditForm';
import AddressForm from '../addressForm/addressForm.js';
import {config} from '../../../config.js';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import AddressCard from '../addressCard/addressCard.js';
import {profileUpdateDataRoute} from '../../config/urls.js';
import {userStore} from '../../stores/user.js';
import ImgEditForm from '../imgEditForm/imgEditForm.js';

const States = {
    INFO_CARD: 'Мои данные',
    ADDRESS_CARD: 'Мои адресса',
};

/**
 * Компонент карточки профиля
 */
export default class Profile {
    #parent;
    #state;
    #config;

    addresses;
    numberEditForm;
    passwordEditForm;
    addressAddForm;
    imgEditForm;

    /**
     *
     * @param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
        this.#state = States.INFO_CARD;
        this.#config = config.profilePage.profile;
        this.#config.currentNavElem = this.#config.navElem1;
    }

    /**
     * Установление состояния карточки в зависимости от нажатия на навбар
     * @param {Event} event
     */
    setState(event) {
        switch (event.target.id) {
        case 'profile-my-data':
            this.#state = States.INFO_CARD;
            this.#config.currentNavElem = this.#config.navElem1;
            this.removeEventListeners();
            this.render();
            break;
        case 'profile-my-addresses':
            this.#state = States.ADDRESS_CARD;
            this.#config.currentNavElem = this.#config.navElem2;
            this.removeEventListeners();
            this.render();
            UserActions.getAddresses();
            break;
        }
    }

    /**
     * Отрисовка формы изменения номера телефона
     * @param {Event} event
     */
    editNumber(event) {
        UserActions.getCSRFToken(profileUpdateDataRoute);
        document.getElementById('profile-data-card').innerHTML = '';
        this.numberEditForm.render(userStore.number);
    }

    editNumber = this.editNumber.bind(this);

    /**
     * Отрисовка формы изменения пароля
     * @param {Event} event
     */
    editPassword(event) {
        UserActions.getCSRFToken(profileUpdateDataRoute);
        document.getElementById('profile-data-card').innerHTML = '';
        this.passwordEditForm.render();
    }

    editPassword = this.editPassword.bind(this);

    /**
     * Отрисовка формы изменения аватарки
     * @param {Event} event
     */
    editImg(event) {
        UserActions.getCSRFToken(profileUpdateDataRoute);
        document.getElementById('profile-data-card').innerHTML = '';
        this.imgEditForm.render();
    }

    editImg = this.editImg.bind(this);

    /**
     * Отрисовк аформы добавления адреса
     * @param {Event} event
     */
    addAddress(event) {
        UserActions.getCSRFToken(profileUpdateDataRoute);
        event.preventDefault();
        document.getElementById('profile-data-card').innerHTML = '';
        this.addressAddForm.render(true);
    }

    addAddress = this.addAddress.bind(this);

    /**
     * Удаление адреса
     * @param {Event} event
     */
    deleteAddress(event) {
        event.preventDefault();
        UserActions.getCSRFToken(profileUpdateDataRoute);
        const currentId = event.target.parentElement.id;
        UserActions.deleteAddress(currentId);
    }

    deleteAddress = this.deleteAddress.bind(this);

    /**
     * Отрисовка формы изменения адреса
     * @param {Event} event
     */
    editAddress(event) {
        event.preventDefault();
        UserActions.getCSRFToken(profileUpdateDataRoute);
        const currentId = event.target.parentElement.id;
        const address = this.addresses.find((address) => address.addressId == currentId);
        document.getElementById('profile-data-card').innerHTML = '';
        this.addressAddForm.render(false, address);
    }

    editAddress = this.editAddress.bind(this);

    /**
     * Изменение текущего адреса
     * @param {Event} event
     */
    currentAddress(event) {
        event.preventDefault();
        UserActions.getCSRFToken(profileUpdateDataRoute);
        const currentId = event.target.parentElement.id;
        UserActions.makeCurrentAddress(currentId);
    }

    currentAddress = this.currentAddress.bind(this);


    /**
     * Отрисовка карточек адресов
     * @param {Array} addresses
     */
    renderAddresses(addresses) {
        this.addresses = addresses;
        const parent = document.getElementById('profile-data-card');
        parent.innerHTML = '';

        if ((Object.keys(addresses).length) > 0) {
            addresses.forEach((element) => {
                const address = new AddressCard(parent, element);
                address.render();
                address.addDeleteEventListeners(this.deleteAddress);
                address.addEditEventListeners(this.editAddress);
                address.addCurrentEventListeners(this.currentAddress);
            });
        }

        const addLink = document.createElement('span');
        addLink.id = 'add-address';
        addLink.className = 'add-address';
        addLink.innerHTML = 'Добавить';
        parent.appendChild(addLink);
        this.addAddressesEventListeners();
    }

    renderAddresses = this.renderAddresses.bind(this);

    /**
     * Добавление листенеров, связанные с разделом адресов
     */
    addAddressesEventListeners() {
        document.getElementById('add-address').addEventListener('click', this.addAddress);
    }

    /**
     * Добавление листенеров
     */
    addEventListeners() {
        document.getElementById('profile-my-data').addEventListener('click',
            this.setState.bind(this));
        document.getElementById('profile-my-addresses').addEventListener('click',
            this.setState.bind(this));
        document.querySelector('.number-edit')?.addEventListener('click',
            this.editNumber);
        document.querySelector('.password-edit')?.addEventListener('click',
            this.editPassword);
        document.querySelector('.avatar-edit')?.addEventListener('click',
            this.editImg);
    }

    /**
     * Отрисовка карточки с информацией пользователя
     */
    renderInfoCard() {
        const infoCard = new InfoCard(document.getElementById('profile-data-card'));
        infoCard.render();
        document.querySelector('.number-edit')?.addEventListener('click',
            this.editNumber);
        document.querySelector('.password-edit')?.addEventListener('click',
            this.editPassword);
        document.querySelector('.avatar-edit')?.addEventListener('click',
            this.editImg);
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.SUCCESSFUL_GET_ADDRESSES, this.renderAddresses);
        eventEmmiter.subscribe(Events.SUCCESSFUL_ADD_ADDRESS, this.renderAddresses);
        eventEmmiter.subscribe(Events.SUCCESSFUL_DELETE_ADDRESS, this.renderAddresses);
        eventEmmiter.subscribe(Events.SUCCESSFUL_UPDATE_ADDRESS, this.renderAddresses);
        eventEmmiter.subscribe(Events.SUCCESSFUL_CURRENT_ADDRESS, this.renderAddresses);
        eventEmmiter.subscribe(Events.SUCCESSFUL_UPDATE_DATA, this.renderInfoCard.bind(this));
        eventEmmiter.subscribe(Events.SUCCESSFUL_UPDATE_IMG, this.renderInfoCard.bind(this));
    }

    /**
     * Удаление листенеров
     */
    removeEventListeners() {

    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {

    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.innerHTML = template(this.#config);

        this.numberEditForm = new NumberEditForm(document.getElementById('profile-data-card'));
        this.passwordEditForm = new PasswordEditForm(document.getElementById('profile-data-card'));
        this.addressAddForm = new AddressForm(document.getElementById('profile-data-card'));
        this.imgEditForm = new ImgEditForm(document.getElementById('profile-data-card'));

        switch (this.#state) {
        case States.INFO_CARD:
            const infoCard = new InfoCard(document.getElementById('profile-data-card'));
            infoCard.render();
            document.getElementById('profile-my-addresses').classList.remove('nav-elem_selected');
            document.getElementById('profile-my-data').classList.add('nav-elem_selected');
            break;
        case States.ADDRESS_CARD:
            document.getElementById('profile-my-data').classList.remove('nav-elem_selected');
            document.getElementById('profile-my-addresses').classList.add('nav-elem_selected');
            break;
        }
        this.addEventListeners();
        this.subscribeToEvents();
    }
}

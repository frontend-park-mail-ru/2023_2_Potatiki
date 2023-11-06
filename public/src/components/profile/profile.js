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
import Link from '../link/link.js';

const States = {
    INFO_CARD: 'Мои данные',
    ADDRESS_CARD: 'Мои адресса',
};

/**
 *
 */
export default class Profile {
    #parent;
    #state;
    #config;

    addresses;
    numberEditForm;
    passwordEditForm;
    addressAddForm;

    /**
     *
     * @param {*} parent
     */
    constructor(parent) {
        this.#parent = parent;
        this.#state = States.INFO_CARD;
        this.#config = config.profilePage.profile;
        this.#config.currentNavElem = this.#config.navElem1;
    }

    /**
     *
     * @param {*} event
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
     *
     * @param {*} event
     */
    editNumber(event) {
        document.querySelector('#profile-data-card').innerHTML = '';
        this.numberEditForm.render();
    }

    /**
     *
     * @param {*} event
     */
    editPassword(event) {
        document.querySelector('#profile-data-card').innerHTML = '';
        this.passwordEditForm.render();
    }

    /**
     *
     * @param {*} event
     */
    addAddress(event) {
        event.preventDefault();
        document.querySelector('#profile-data-card').innerHTML = '';
        this.addressAddForm.render(true);
    }

    addAddress = this.addAddress.bind(this);

    /**
     *
     * @param {*} event
     */
    deleteAddress(event) {
        event.preventDefault();
        console.log('delete card');
    }

    deleteAddress = this.deleteAddress.bind(this);

    /**
     *
     * @param {*} event
     */
    editAddress(event) {
        event.preventDefault();
        const currentId = event.target.parentElement.id;
        const address = this.addresses.find((address) => address.id == currentId);
        document.querySelector('#profile-data-card').innerHTML = '';
        this.addressAddForm.render(false, address);
    }

    editAddress = this.editAddress.bind(this);


    /**
     *
     * @param {*} addresses
     */
    renderAddresses(addresses) {
        this.addresses = addresses;
        const parent = document.querySelector('#profile-data-card');

        addresses.forEach((element) => {
            const address = new AddressCard(parent, element);
            address.render();
            address.addDeleteEventListeners(this.deleteAddress);
            address.addEditEventListeners(this.editAddress);
        });

        const addLink = new Link(parent, {text: 'Добавить', id: 'add-address'});
        addLink.render();
        this.addAddressesEventListeners();
    }

    renderAddresses = this.renderAddresses.bind(this);

    /**
     *
     */
    addAddressesEventListeners() {
        document.querySelector('#add-address').addEventListener('click', this.addAddress);
    }

    /**
     *
     */
    addEventListeners() {
        document.querySelector('#profile-my-data').addEventListener('click',
            this.setState.bind(this));
        document.querySelector('#profile-my-addresses').addEventListener('click',
            this.setState.bind(this));
        document.querySelector('.number-edit')?.addEventListener('click',
            this.editNumber.bind(this));
        document.querySelector('.password-edit')?.addEventListener('click',
            this.editPassword.bind(this));
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.SUCCESSFUL_GET_ADDRESSES, this.renderAddresses);
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

        this.numberEditForm = new NumberEditForm(document.querySelector('#profile-data-card'));
        this.passwordEditForm = new PasswordEditForm(document.querySelector('#profile-data-card'));
        this.addressAddForm = new AddressForm(document.querySelector('#profile-data-card'));

        switch (this.#state) {
        case States.INFO_CARD:
            const infoCard = new InfoCard(document.querySelector('#profile-data-card'));
            infoCard.render();
            document.querySelector('#profile-my-addresses').classList.remove('nav-elem_selected');
            document.querySelector('#profile-my-data').classList.add('nav-elem_selected');
            break;
        case States.ADDRESS_CARD:
            document.querySelector('#profile-my-data').classList.remove('nav-elem_selected');
            document.querySelector('#profile-my-addresses').classList.add('nav-elem_selected');
            break;
        }
        this.addEventListeners();
        this.subscribeToEvents();
    }
}

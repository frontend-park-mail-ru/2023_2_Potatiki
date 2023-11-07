import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkLogin, checkPassword, checkPhone, cleanPhone, formatPhone} from '../modules/validation';
import {loginUrl, signupUrl, checkUrl, logoutUrl, mainRoute, getProductsUrl, loginRoute, signupRoute, updateDataUrl, profileUpdateDataRoute,
    addAddressUrl, getAddressesUrl, updateAddressUrl, deleteAddressUrl, makeCurrentAddressUrl, getCurrentAddressUrl} from '../config/urls';
import {Events} from '../config/events';
import {reviver} from '../modules/utils';
import renderServerMessage from '../modules/server-message';
import router from '../modules/router';

/**
 * Класс
 */
class UserStore {
    #state = {
        loginName: 'login',
        number: '+7(999)000-00-00',
        imgSrc: '',
        isAuth: false,
        csrfToken: '',
        addresses: [],
    };

    /**
     *
     */
    constructor() {
        this.registerEvents();
        this.subscribeToEvents();
    }

    /**
     *
     */
    get isAuth() {
        return this.#state.isAuth;
    }

    /**
     *
     */
    get loginName() {
        return this.#state.loginName;
    }

    /**
     *
     */
    get number() {
        return this.#state.number;
    }

    /**
     *
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case UserActionsType.CHECK_SESSION:
                this.checkSession();
                break;
            case UserActionsType.LOGIN:
                this.login(action.payload.login, action.payload.password);
                break;
            case UserActionsType.SIGNUP:
                this.signup(
                    action.payload.login,
                    action.payload.password,
                    action.payload.repeatPassword,
                    action.payload.phone,
                );
                break;
            case UserActionsType.VALIDATE_LOGIN:
                this.validateLogin(action.payload.login);
                break;
            case UserActionsType.VALIDATE_PASSWORD:
                this.validatePassword(action.payload.password);
                break;
            case UserActionsType.VALIDATE_REPEAT_PASSWORD:
                this.validateRepeatPassword(
                    action.payload.password,
                    action.payload.repeatPassword,
                );
                break;
            case UserActionsType.LOGOUT:
                this.logout();
                break;
            case UserActionsType.REMOVE_LISTENERS:
                this.removeListeners();
                break;
            case UserActionsType.VALIDATE_PHONE:
                this.validatePhone(action.payload.phone);
                break;
            case UserActionsType.CHECK_AUTH:
                this.checkAuth();
                break;
            case UserActionsType.GET_PROFILE_DATA:
                this.getProfileData();
                break;
            case UserActionsType.GET_CSRF_TOKEN:
                this.getCsrfToken(action.payload.page);
                break;
            case UserActionsType.GET_CURRENT_ADDRESS:
                this.getCurrentAddress();
                break;
            case UserActionsType.GET_ADDRESSES:
                this.getAddresses();
                break;
            case UserActionsType.UPDATE_NUMBER:
                this.updateNuber(action.payload.number);
                break;
            case UserActionsType.UPDATE_PASSWORD:
                this.updatePassword(action.payload.oldPassword, action.payload.newPassword,
                    action.payload.repeatPassword);
                break;
            case UserActionsType.ADD_ADDRESS:
                this.addAddress(action.payload.city, action.payload.street, action.payload.house,
                    action.payload.flat);
                break;
            case UserActionsType.UPDATE_ADDRESS:
                this.updateAddress(action.payload.id, action.payload.isCurrent,
                    action.payload.city, action.payload.street, action.payload.house,
                    action.payload.flat);
                break;
            case UserActionsType.DELETE_ADDRESS:
                this.deleteAddress(action.payload.id);
                break;
            case UserActionsType.MAKE_CURRENT_ADDRESS:
                this.makeCurrentAddress(action.payload.id);
            default:
                break;
            }
        });
    }

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, this.userNotAuth);
    }

    removeListeners() {
        eventEmmiter.emit(Events.REMOVE_SUBSCRIBES);
        eventEmmiter.emit(Events.REMOVE_LISTENERS);
    }

    userNotAuth() {
        this.#state.isAuth = false;
    }

    userNotAuth = this.userNotAuth.bind(this);

    checkAuth() {
        if (!this.isAuth) {
            eventEmmiter.emit(Events.PAGE_FORBIDDEN);
            return;
        }
        eventEmmiter.emit(Events.PAGE_ALLOWED);
    }

    /**
     *
     */
    async checkSession() {
        const [statusCode, body] = await Ajax.prototype.getRequest(checkUrl);
        console.log('check auth', statusCode);
        switch (statusCode) {
        case 200:
            this.#state.isAuth = true;
            this.#state.loginName = body.login;
            this.#state.number = body.phone;
            this.#state.imgSrc = body.img;
            eventEmmiter.emit(Events.USER_IS_AUTH, {url: location.pathname});
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
            router.go({url: location.pathname});

            break;
        case 429:
            renderServerMessage('Ошибка. Попробуйте позже');
            router.go({url: location.pathname});
            break;
        default:
            break;
        }
    }

    /**
     *@param {String} login
     *@param {String} password
     */
    async login(login, password) {
        const [, isValidLogin] = checkLogin(login);

        const [, isValidPassword] = checkPassword(password);

        if (!(isValidLogin && isValidPassword)) {
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(loginUrl, {
            login,
            password,
        },
        this.#state.csrfToken,
        );
        switch (statusCode) {
        case 200:
            this.#state.loginName = login;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_LOGIN);
            break;
        case 403:
            renderServerMessage('Ошибка доступа');
            break;
        case 400:
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    /**
     *@param {String} login
     *@param {String} password
     *@param {String} repeatPassword
     */
    async signup(login, password, repeatPassword, phone) {
        const isValidLogin = this.validateLogin(login);
        const isValidPassword = this.validatePassword(password);
        const isValidRepeatPassword = this.validateRepeatPassword(
            password,
            repeatPassword,
        );

        if (!(isValidLogin && isValidPassword && isValidRepeatPassword)) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(signupUrl, {
            login,
            password,
            phone,
        },
        this.#state.csrfToken,
        );
        switch (statusCode) {
        case 200:
            this.#state.loginName = login;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_SIGNUP);
            break;
        case 400:
            eventEmmiter.emit(
                Events.SIGNUP_FORM_ERROR,
                'Такой логин уже существует',
            );
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    /**
     *@param {String} login
     *@return {Boolean}
     */
    validateLogin(login) {
        const [error, isValidLogin] = checkLogin(login);
        if (!isValidLogin) {
            eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@return {Boolean}
     */
    validatePassword(password) {
        const [error, isValidPassword] = checkPassword(password);
        if (!isValidPassword) {
            eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@param {String} repeatPassword
     *@return {Boolean}
     */
    validateRepeatPassword(password, repeatPassword) {
        if (password !== repeatPassword) {
            eventEmmiter.emit(
                Events.REPEAT_PASSWORD_INPUT_ERROR,
                'Пароли не совпадают',
            );
            return false;
        }
        return true;
    }

    /**
     *
     */
    async logout() {
        this.#state.loginName = '';
        this.#state.isAuth = false;
        Ajax.prototype.getRequest(logoutUrl);
        eventEmmiter.emit(Events.LOGOUT, {url: '/'});
    }

    /**
     *
     * @param {*} number
     * @returns
     */
    validatePhone(number) {
        const [error, isValidNumber] = checkPhone(number);
        if (!isValidNumber) {
            eventEmmiter.emit(Events.PHONE_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    async getProfileData() {
        const [statusCode, body] = await Ajax.prototype.getRequest(checkUrl);
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.PROFILE_DATA, body);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    }

    async recordCSRFToken(url) {
        const [statusCode, token] = await Ajax.prototype.getCSRFRequest(url);
        switch (statusCode) {
        case 200:
            this.#state.csrfToken = token;
            break;
        default:
            break;
        }
    }

    async getCsrfToken(page) {
        switch (page) {
        case loginRoute:
            this.recordCSRFToken(loginUrl);
        case signupRoute:
            this.recordCSRFToken(signupUrl);
        case profileUpdateDataRoute:
            console.log('signup');
            this.recordCSRFToken(updateDataUrl);
        default:
            break;
        }
    }

    async getCurrentAddress() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getCurrentAddressUrl);
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.CURRENT_ADDRESS, body);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        case 404:
            eventEmmiter.emit(Events.ADDRESS_NOT_FOUND, body);
            break;
        case 429:
            renderServerMessage('Возникла ошибка при получении адреса');
            break;
        default:
            break;
        }
    }

    /**
     *
     */
    async getAddresses() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getAddressesUrl);
        switch (statusCode) {
        case 200:
            body.sort((a, b) => {
                return b.isCurrent - a.isCurrent;
            });
            this.#state.addresses = body;
            eventEmmiter.emit(Events.SUCCESSFUL_GET_ADDRESSES, body);
            break;
        case 404:
            this.#state.addresses = [];
            eventEmmiter.emit(Events.SUCCESSFUL_GET_ADDRESSES, []);
            break;
        case 401:
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
        }
    }

    /**
     *
     * @param {*} number
     */
    async updateNuber(number) {
        const isValidNumber = this.validatePhone(number);
        if (!isValidNumber) {
            return;
        }

        number = cleanPhone(number);
        console.log(number);
        const [statusCode, body] = await Ajax.prototype.postRequest(updateDataUrl, {
            'passwords': {
                'newPass': '',
                'oldPass': ''},
            'phone': number,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
            case 200:
                this.#state.number = formatPhone(number);
                eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_DATA);
                break;
            case 401:
                this.#state.isAuth = false;
                eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
                break;
            default:
                eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
                break;

        }
    }

    /**
     *
     * @param {*} number
     */
    async updatePassword(oldPassword, newPassword, repeatPassword) {
        const [statusCode, body] = await Ajax.prototype.postRequest(updateDataUrl, {
            'passwords': {
                'newPass': newPassword,
                'oldPass': oldPassword},
            'phone': '',
        },
        this.#state.csrfToken,
        );
        console.log(statusCode);

        switch (statusCode) {
        case 200:
            this.#state.number = number;
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_DATA);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        }
    }
    
    /**
     *
     * @param {*} city
     * @param {*} street
     * @param {*} house
     * @param {*} flat
     * @returns
     */
    async addAddress(city, street, house, flat) {
        if (!city || !street || !house || !flat) {
            eventEmmiter.emit(Events.ADD_ADDRESS_FORM_ERROR);
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(addAddressUrl, {
            city,
            flat,
            house,
            street,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            this.#state.addresses.forEach((element) => {
                element.isCurrent = false;
            });
            this.#state.addresses.push(body);
            [this.#state.addresses[0], this.#state.addresses[this.#state.addresses.length - 1]] =
            [this.#state.addresses[this.#state.addresses.length - 1], this.#state.addresses[0]];
            eventEmmiter.emit(Events.SUCCESSFUL_ADD_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     *
     * @param {*} addressId
     * @param {*} isCurrent
     * @param {*} city
     * @param {*} street
     * @param {*} house
     * @param {*} flat
     */
    async updateAddress(addressId, isCurrent, city, street, house, flat) {
        if (!city || !street || !house || !flat) {
            eventEmmiter.emit(Events.ADD_ADDRESS_FORM_ERROR);
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(updateAddressUrl, {
            addressId,
            isCurrent,
            city,
            flat,
            house,
            street,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            this.#state.addresses.forEach((element) => {
                if (element.addressId === body.addressId) {
                    element.city = body.city;
                    element.street = body.street;
                    element.flat = body.flat;
                    element.house = body.house;
                }
            });
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     *
     * @param {*} addressId
     */
    async deleteAddress(addressId) {
        const [statusCode, body] = await Ajax.prototype.deleteRequest(deleteAddressUrl, {
            addressId,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            let index;
            this.#state.addresses.forEach((element, ind) => {
                if (element.addressId === addressId) {
                    element.isCurrent = true;
                    index = ind;
                }
            });
            if (index > -1) {
                this.#state.addresses.splice(index, 1);
            }
            eventEmmiter.emit(Events.SUCCESSFUL_DELETE_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     *
     * @param {*} addressId
     */
    async makeCurrentAddress(addressId) {
        const [statusCode, body] = await Ajax.prototype.postRequest(makeCurrentAddressUrl, {
            addressId,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            let indCurrent;
            this.#state.addresses[0].isCurrent = false;
            this.#state.addresses.forEach((element, ind) => {
                if (element.addressId === addressId) {
                    element.isCurrent = true;
                    indCurrent = ind;
                }
            });
            [this.#state.addresses[0], this.#state.addresses[indCurrent]] =
            [this.#state.addresses[indCurrent], this.#state.addresses[0]];
            console.log(this.#state.addresses);
            eventEmmiter.emit(Events.SUCCESSFUL_CURRENT_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        }
    }
}
export const userStore = new UserStore();

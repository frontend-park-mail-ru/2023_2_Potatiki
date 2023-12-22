import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkAddressField, checkLogin, checkPassword, checkPhone, cleanPhone,
    formatPhone} from '../modules/validation';
import {loginUrl, signupUrl, checkUrl, logoutUrl, loginRoute,
    signupRoute, updateDataUrl, profileUpdateDataRoute,
    addAddressUrl, getAddressesUrl, updateAddressUrl,
    deleteAddressUrl, makeCurrentAddressUrl,
    getCurrentAddressUrl, orderRoute, createOrderUrl,
    updatePhotoUrl, reviewRoute, createReviewUrl} from '../config/urls';
import {Events} from '../config/events';
import {removeWarningMessage,
    renderServerMessage} from '../modules/server-message';
import {notificationStore} from './notification';

/**
 * Класс хранилище для работы с данными пользователя
 */
class UserStore {
    #state = {
        loginName: 'login',
        number: '+7(999)000-00-00',
        imgSrc: '',
        isAuth: false,
        csrfToken: '',
        addresses: [],
        connection: true,
    };

    /**
     * Конструктора user store
     */
    constructor() {
        this.registerEvents();
    }

    /**
     * Получение CSRF-токена
     */
    get csrfToken() {
        return this.#state.csrfToken;
    }

    /**
     * Getter для взятия поля isAuth
     */
    get isAuth() {
        return this.#state.isAuth;
    }

    /**
     * Getter для взятия поля loginName
     */
    get loginName() {
        return this.#state.loginName;
    }

    /**
     * Getter для взятия поля number
     */
    get number() {
        return this.#state.number;
    }

    /**
     * Getter для взятия поля imgSrc
     */
    get imgSrc() {
        return this.#state.imgSrc;
    }

    /**
     * Getter для взятия поля connection
     */
    get connection() {
        return this.#state.connection;
    }

    /**
     * Регистрация событий в store
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
            case UserActionsType.VALIDATE_CITY:
                this.validateCity(action.payload.city);
                break;
            case UserActionsType.VALIDATE_STREET:
                this.validateStreet(action.payload.street);
                break;
            case UserActionsType.VALIDATE_HOUSE:
                this.validateHouse(action.payload.house);
                break;
            case UserActionsType.VALIDATE_FLAT:
                this.validateFlat(action.payload.flat);
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
                this.updateAddress(action.payload.id, action.payload.addressIsCurrent,
                    action.payload.city, action.payload.street, action.payload.house,
                    action.payload.flat);
                break;
            case UserActionsType.DELETE_ADDRESS:
                this.deleteAddress(action.payload.id);
                break;
            case UserActionsType.MAKE_CURRENT_ADDRESS:
                this.makeCurrentAddress(action.payload.id);
                break;
            case UserActionsType.UPDATE_IMG:
                this.updateImg(action.payload.img);
                break;
            case UserActionsType.SET_OFFLINE:
                this.setOffline();
                break;
            case UserActionsType.SET_ONLINE:
                this.setOnline();
                break;
            case UserActionsType.LOCAL_REMOVE_LISTENERS:
                this.localRemoveListeners();
                break;
            default:
                break;
            }
        });
    }

    /**
     * Рассылка подписанным компоненнтам события для отписки от ависимых событий
     */
    removeListeners() {
        eventEmmiter.emit(Events.REMOVE_SUBSCRIBES);
        eventEmmiter.emit(Events.REMOVE_LISTENERS);
    }

    /**
     * Проверяет сессию пользователя
     */
    checkAuth() {
        if (!this.isAuth) {
            eventEmmiter.emit(Events.PAGE_FORBIDDEN);
            return;
        }
        eventEmmiter.emit(Events.PAGE_ALLOWED);
    }

    /**
     * Установка поля connection в false
     */
    setOffline() {
        if (!this.connection) {
            return;
        }
        this.#state.connection = false;
        eventEmmiter.emit(Events.WARN_MESSAGE, 'Отсутствует интернет-соединение');
    }

    /**
     * Установка поля connection
     */
    setOnline() {
        if (this.connection) {
            return;
        }
        this.#state.connection = true;
        this.checkSession();
        removeWarningMessage();
        eventEmmiter.emit(Events.SERVER_MESSAGE, 'Подключение восстановлено', true);
    }

    /**
     * Проверяет сессию пользовтеля запросом на сервер
     */
    async checkSession() {
        const [statusCode, body] = await Ajax.prototype.getRequest(checkUrl);
        switch (statusCode) {
        case 200:
            this.#state.isAuth = true;
            this.#state.loginName = body.login;
            this.#state.number = formatPhone(body.phone);
            this.#state.imgSrc = body.img;
            eventEmmiter.emit(Events.USER_IS_AUTH, {url: location.pathname + location.search});
            notificationStore.connectWS();
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname + location.search});
            break;
        case 429:
            renderServerMessage('Ошибка. Попробуйте позже');
            eventEmmiter.emit(Events.REDIRECT, {url: location.pathname});
            break;
        default:
            break;
        }
    }

    /**
     * Авторизация
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
            this.#state.isAuth = true;
            this.#state.loginName = body.login;
            this.#state.number = formatPhone(body.phone);
            this.#state.imgSrc = body.img;
            eventEmmiter.emit(Events.SUCCESSFUL_LOGIN);
            notificationStore.connectWS();
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
     * Регистрация
     *@param {String} login
     *@param {String} password
     *@param {String} repeatPassword
     *@param {String} phone
     */
    async signup(login, password, repeatPassword, phone) {
        const isValidLogin = this.validateLogin(login);
        const isValidPassword = this.validatePassword(password);
        const isValidNumber = this.validatePhone(phone);
        const isValidRepeatPassword = this.validateRepeatPassword(
            password,
            repeatPassword,
        );

        if (!(isValidLogin && isValidPassword && isValidRepeatPassword && isValidNumber)) {
            return;
        }

        phone = cleanPhone(phone);

        const [statusCode, body] = await Ajax.prototype.postRequest(signupUrl, {
            login,
            password,
            phone,
        },
        this.#state.csrfToken,
        );
        switch (statusCode) {
        case 200:
            this.#state.loginName = body.login;
            this.#state.number = formatPhone(body.phone);
            this.#state.imgSrc = body.img;
            this.#state.isAuth = true;
            console.log('signup');
            eventEmmiter.emit(Events.SUCCESSFUL_SIGNUP);
            notificationStore.connectWS();
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
     * Валидация логина
     *@param {String} login
     *@return {Boolean} проверка на валидацию
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
     * Валидация пароля
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
     * Валидация повтора пароля
     *@param {String} password
     *@param {String} repeatPassword
     *@return {Boolean} проверка на валидацию
     */
    validateRepeatPassword(password, repeatPassword) {
        if (password !== repeatPassword) {
            eventEmmiter.emit(
                Events.REPEAT_PASSWORD_INPUT_ERROR,
                'Пароли не совпадают',
            );
            return false;
        }
        eventEmmiter.emit(Events.REPEAT_PASSWORD_INPUT_ERROR, '');
        return true;
    }

    /**
     * Выход из профиля
     */
    async logout() {
        this.#state.loginName = '';
        this.#state.isAuth = false;
        Ajax.prototype.getRequest(logoutUrl);
        eventEmmiter.emit(Events.LOGOUT, {url: '/'});
        notificationStore.disconnectWS();
        notificationStore.deleteNotifications();
    }

    /**
     * Валидация номера телефона
     * @param {String} number
     * @return {Boolean} проверка на валидацию
     */
    validatePhone(number) {
        const [error, isValidNumber] = checkPhone(number);
        if (!isValidNumber) {
            eventEmmiter.emit(Events.PHONE_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    /**
     * Валидация номера телефона
     * @param {String} city
     * @return {Boolean} проверка на валидацию
     */
    validateCity(city) {
        const [error, isValidCity] = checkAddressField(city, false);
        if (!isValidCity) {
            eventEmmiter.emit(Events.CITY_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    /**
     * Валидация номера телефона
     * @param {String} street
     * @return {Boolean} проверка на валидацию
     */
    validateStreet(street) {
        const [error, isValidStreet] = checkAddressField(street, false);
        if (!isValidStreet) {
            eventEmmiter.emit(Events.STREET_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    /**
     * Валидация номера телефона
     * @param {String} house
     * @return {Boolean} проверка на валидацию
     */
    validateHouse(house) {
        const [error, isValidHouse] = checkAddressField(house, false);
        if (!isValidHouse) {
            eventEmmiter.emit(Events.HOUSE_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    /**
     * Валидация квартиры
     * @param {String} flat
     * @return {Boolean} проверка на валидацию
     */
    validateFlat(flat) {
        const [error, isValidFlat] = checkAddressField(flat, true);
        if (!isValidFlat) {
            eventEmmiter.emit(Events.FLAT_INPUT_ERROR, error);
            return false;
        }
        return true;
    }

    /**
     * Взятие данных о пользователе
     */
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    }

    /**
     * Запись CSRF-токена
     * @param {String} url Путь для взятия
     */
    async recordCSRFToken(url) {
        const [statusCode, token] = await Ajax.prototype.getCSRFRequest(url);
        switch (statusCode) {
        case 200:
            this.#state.csrfToken = token;
            break;
        default:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка подключения');
            break;
        }
    }

    /**
     * Взятие CSRF-токена
     * @param {String} page Страница, которая запрашивает токен
     */
    async getCsrfToken(page) {
        switch (page) {
        case loginRoute:
            this.recordCSRFToken(loginUrl);
            break;
        case signupRoute:
            this.recordCSRFToken(signupUrl);
            break;
        case orderRoute:
            this.recordCSRFToken(createOrderUrl);
            break;
        case profileUpdateDataRoute:
            this.recordCSRFToken(updateDataUrl);
            break;
        case reviewRoute:
            this.recordCSRFToken(createReviewUrl);
            break;
        default:
            break;
        }
    }

    /**
     * Вязтие текущего адреса
     */
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
            eventEmmiter.emit(Events.ADDRESS_NOT_FOUND, body);
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении адреса');
            break;
        default:
            break;
        }
    }

    /**
     * Взятие адресов пользователя
     */
    async getAddresses() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getAddressesUrl);
        switch (statusCode) {
        case 200:
            body.sort((a, b) => {
                return b.addressIsCurrent - a.addressIsCurrent;
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
        }
    }

    /**
     * Обновление номера телефона пользователя
     * @param {String} number Новый номер телефона
     */
    async updateNuber(number) {
        const isValidNumber = this.validatePhone(number);
        if (!isValidNumber) {
            return;
        }

        number = cleanPhone(number);
        const [statusCode] = await Ajax.prototype.postRequest(updateDataUrl, {
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Обновление пароля пользователя
     * @param {String} oldPassword Старый пароль
     * @param {String} newPassword Новый пароль
     * @param {String} repeatPassword Повторенный пароль
     */
    async updatePassword(oldPassword, newPassword, repeatPassword) {
        const isValidPassword = this.validatePassword(newPassword);
        const isValidRepeatPassword = this.validateRepeatPassword(
            newPassword,
            repeatPassword,
        );

        if (!(isValidRepeatPassword && isValidPassword)) {
            return;
        }

        const [statusCode] = await Ajax.prototype.postRequest(updateDataUrl, {
            'passwords': {
                'newPass': newPassword,
                'oldPass': oldPassword},
            'phone': '',
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_DATA);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        case 400:
            eventEmmiter.emit(Events.UPDATE_PASSWORD_FORM_ERROR, 'Неверный пароль');
        default:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Добавление адреса
     * @param {String} city Город адреса
     * @param {String} street Улица адреса
     * @param {String} house Номер дома адреса
     * @param {String} flat Номер квартиры адреса
     */
    async addAddress(city, street, house, flat) {
        this.recordCSRFToken(addAddressUrl);
        const isValidCity = this.validateCity(city);
        const isValidStreet = this.validateStreet(street);
        const isValidHouse = this.validateHouse(house);
        const isValidFlat = this.validateFlat(flat);

        if (!isValidCity || !isValidStreet || !isValidHouse || !isValidFlat) {
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
                element.addressIsCurrent = false;
            });
            this.#state.addresses.push(body);
            if (this.#state.addresses.length > 1) {
                [this.#state.addresses[0],
                    this.#state.addresses[this.#state.addresses.length - 1]] =
                [this.#state.addresses[this.#state.addresses.length - 1], this.#state.addresses[0]];
            }
            eventEmmiter.emit(Events.SUCCESSFUL_ADD_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     *  Обновление данных адреса
     * @param {String} addressId Id адреса
     * @param {Boolean} addressIsCurrent Флаг о текущем адресе
     * @param {String} city Город адреса
     * @param {String} street Улица адреса
     * @param {String} house Номер дома адреса
     * @param {String} flat Номер квартиры адреса
     */
    async updateAddress(addressId, addressIsCurrent, city, street, house, flat) {
        const isValidCity = this.validateCity(city);
        const isValidStreet = this.validateStreet(street);
        const isValidHouse = this.validateHouse(house);
        const isValidFlat = this.validateFlat(flat);

        if (!isValidCity || !isValidStreet || !isValidHouse || !isValidFlat) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(updateAddressUrl, {
            addressId,
            addressIsCurrent,
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Удаление адреса
     * @param {String} addressId Id адреса
     */
    async deleteAddress(addressId) {
        const [statusCode] = await Ajax.prototype.deleteRequest(deleteAddressUrl, {
            addressId,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            let index;
            this.#state.addresses.forEach((element, ind) => {
                if (element.addressId === addressId) {
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
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Обновление текущего адреса
     * @param {String} addressId Новый текущий адрес
     */
    async makeCurrentAddress(addressId) {
        const [statusCode] = await Ajax.prototype.postRequest(makeCurrentAddressUrl, {
            addressId,
        },
        this.#state.csrfToken,
        );

        switch (statusCode) {
        case 200:
            let indCurrent;
            this.#state.addresses[0].addressIsCurrent = false;
            this.#state.addresses.forEach((element, ind) => {
                if (element.addressId === addressId) {
                    element.addressIsCurrent = true;
                    indCurrent = ind;
                }
            });
            [this.#state.addresses[0], this.#state.addresses[indCurrent]] =
            [this.#state.addresses[indCurrent], this.#state.addresses[0]];
            eventEmmiter.emit(Events.SUCCESSFUL_CURRENT_ADDRESS, this.#state.addresses);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Обновление аватарки пользователя
     * @param {Blob} img
     */
    async updateImg(img) {
        const [statusCode, body] = await Ajax.prototype.postBinRequest(updatePhotoUrl, img,
            this.#state.csrfToken,
        );
        this.#state.imgSrc = body.img;
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.SUCCESSFUL_UPDATE_IMG);
            break;
        default:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка. Попробуйте позже');
            break;
        }
    }

    /**
     * Удаление лисенеров у части элементов на странице
     */
    localRemoveListeners() {
        eventEmmiter.emit(Events.LOCAL_REMOVE_LISTENERS);
    }
}

export const userStore = new UserStore();
